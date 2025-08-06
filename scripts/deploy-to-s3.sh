#!/bin/bash

# 환경 설정
set -e  # 에러 시 스크립트 중단
set -o pipefail  # 파이프 에러 시 스크립트 중단

# 설정 변수
S3_BUCKET="${S3_BUCKET:-serenade-prod-website}"
BUILD_DIR="out"
AWS_REGION="${AWS_REGION:-ap-northeast-2}"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID}"

echo "🚀 Starting deployment to S3..."
echo "Bucket: $S3_BUCKET"
echo "Region: $AWS_REGION"
echo "Build directory: $BUILD_DIR"

# 빌드 디렉토리 존재 확인
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory '$BUILD_DIR' not found. Please run 'npm run build' first."
  exit 1
fi

# S3 버킷 존재 확인
echo "🔍 Checking S3 bucket access..."
if ! aws s3 ls "s3://$S3_BUCKET" --region "$AWS_REGION" > /dev/null 2>&1; then
  echo "❌ Cannot access S3 bucket '$S3_BUCKET'. Please check your AWS credentials and bucket name."
  exit 1
fi

echo "✅ S3 bucket access confirmed"

# 이전 파일 백업 (선택사항)
echo "📦 Creating backup of current deployment..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
aws s3 sync "s3://$S3_BUCKET" "s3://$S3_BUCKET-backup-$TIMESTAMP" --region "$AWS_REGION" --quiet || echo "⚠️  Backup failed or no existing files"

# S3에 파일 업로드
echo "📤 Uploading files to S3..."
aws s3 sync "$BUILD_DIR" "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --delete \
  --exclude "*.DS_Store" \
  --cache-control "public, max-age=31536000, immutable" \
  --metadata-directive REPLACE

# HTML 파일에 대해서는 다른 캐시 설정 적용
echo "🔧 Setting cache headers for HTML files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
  --recursive \
  --region "$AWS_REGION" \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=300" \
  --metadata-directive REPLACE

# CloudFront 캐시 무효화 (Distribution ID가 설정된 경우)
if [ -n "$DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" > /dev/null
  echo "✅ CloudFront invalidation initiated"
fi

# 배포 완료 확인
echo "🔍 Verifying deployment..."
WEBSITE_URL="https://$S3_BUCKET.s3.$AWS_REGION.amazonaws.com/index.html"
if curl -s -o /dev/null -w "%{http_code}" "$WEBSITE_URL" | grep -q "200"; then
  echo "✅ Deployment successful!"
  echo "🌐 Website URL: $WEBSITE_URL"
else
  echo "⚠️  Deployment may have issues. Please check manually."
fi

echo "🎉 Deployment completed successfully!"