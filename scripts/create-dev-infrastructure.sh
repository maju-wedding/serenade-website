#!/bin/bash

# Development Environment Infrastructure Setup Script
# This script creates S3 bucket and CloudFront distribution for the development environment

set -e

# Configuration
BUCKET_NAME="serenade-dev-website"
REGION="ap-northeast-2"
CLOUDFRONT_ORIGIN_ACCESS_CONTROL_NAME="serenade-dev-oac"

echo "🚀 Setting up development infrastructure..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Create S3 bucket
echo "📦 Creating S3 bucket..."
if aws s3 ls "s3://$BUCKET_NAME" > /dev/null 2>&1; then
    echo "⚠️ Bucket $BUCKET_NAME already exists"
else
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    echo "✅ Created S3 bucket: $BUCKET_NAME"
fi

# Configure bucket for static website hosting
echo "🌐 Configuring static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document 404.html

echo "✅ Static website hosting configured"

# Block public access (we'll use CloudFront)
echo "🔒 Configuring bucket security..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "✅ Public access blocked"

# Create bucket policy for CloudFront Origin Access Control
echo "📝 Creating bucket policy..."
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$(aws sts get-caller-identity --query Account --output text):distribution/*"
                }
            }
        }
    ]
}
EOF

# We'll apply the bucket policy after creating CloudFront distribution

# Create CloudFront Origin Access Control
echo "🔐 Creating CloudFront Origin Access Control..."
OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config \
    "Name=$CLOUDFRONT_ORIGIN_ACCESS_CONTROL_NAME,Description=Origin Access Control for $BUCKET_NAME,OriginAccessControlOriginType=s3,SigningBehavior=always,SigningProtocol=sigv4" \
    --query 'OriginAccessControl.Id' --output text)

echo "✅ Created Origin Access Control: $OAC_ID"

# Create CloudFront distribution configuration
echo "☁️ Creating CloudFront distribution..."
cat > cloudfront-config.json << EOF
{
    "CallerReference": "serenade-dev-$(date +%s)",
    "Comment": "Serenade Development Website Distribution",
    "DefaultCacheBehavior": {
        "TargetOriginId": "$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "MinTTL": 0,
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "Compress": true,
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
    },
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.$REGION.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                },
                "OriginAccessControlId": "$OAC_ID"
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100",
    "DefaultRootObject": "index.html",
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/404.html",
                "ResponseCode": "404",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF

# Create CloudFront distribution
DISTRIBUTION_RESULT=$(aws cloudfront create-distribution --distribution-config file://cloudfront-config.json)
DISTRIBUTION_ID=$(echo "$DISTRIBUTION_RESULT" | jq -r '.Distribution.Id')
DOMAIN_NAME=$(echo "$DISTRIBUTION_RESULT" | jq -r '.Distribution.DomainName')

echo "✅ Created CloudFront distribution: $DISTRIBUTION_ID"
echo "✅ CloudFront domain: $DOMAIN_NAME"

# Update bucket policy with the actual CloudFront distribution ARN
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$(aws sts get-caller-identity --query Account --output text):distribution/$DISTRIBUTION_ID"
                }
            }
        }
    ]
}
EOF

# Apply bucket policy
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file://bucket-policy.json
echo "✅ Applied bucket policy"

# Clean up temporary files
rm -f bucket-policy.json cloudfront-config.json

echo ""
echo "🎉 Development infrastructure setup completed!"
echo ""
echo "📋 Summary:"
echo "- S3 Bucket: $BUCKET_NAME"
echo "- S3 Website URL: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "- CloudFront Distribution ID: $DISTRIBUTION_ID"
echo "- CloudFront URL: https://$DOMAIN_NAME"
echo ""
echo "📝 Next steps:"
echo "1. Add the following to your GitHub repository variables:"
echo "   - CLOUDFRONT_DISTRIBUTION_ID_DEV: $DISTRIBUTION_ID"
echo ""
echo "2. (Optional) Configure custom domain for development:"
echo "   - Create a CNAME record: dev.serenade-wedding.com -> $DOMAIN_NAME"
echo "   - Add SSL certificate in CloudFront"
echo ""
echo "3. The development workflow is ready to use!"
echo "   - Push to 'develop' branch to trigger deployment"
echo ""
echo "⏰ Note: CloudFront distribution deployment may take 10-15 minutes to complete."