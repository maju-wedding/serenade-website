# Development Environment Deployment Setup

이 가이드는 `develop` 브랜치를 위한 별도의 배포 환경 설정 방법을 설명합니다.

## 개요

- **Production**: `main` 브랜치 → `serenade-prod-website` S3 → `serenade-wedding.com`
- **Development**: `develop` 브랜치 → `serenade-dev-website` S3 → `dev.serenade-wedding.com`

## 1. AWS 인프라 설정

### 자동 설정 (권장)

```bash
# 스크립트 실행
./scripts/create-dev-infrastructure.sh
```

이 스크립트는 다음을 자동으로 생성합니다:
- S3 버킷: `serenade-dev-website`
- CloudFront 배포
- 필요한 보안 정책들

### 수동 설정

#### S3 버킷 생성

```bash
# 1. S3 버킷 생성
aws s3 mb s3://serenade-dev-website --region ap-northeast-2

# 2. 정적 웹사이트 호스팅 설정
aws s3 website s3://serenade-dev-website \
    --index-document index.html \
    --error-document 404.html

# 3. 퍼블릭 액세스 차단 (CloudFront를 통해서만 접근)
aws s3api put-public-access-block \
    --bucket serenade-dev-website \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

#### CloudFront 배포 설정

1. AWS 콘솔에서 CloudFront 이동
2. "Create Distribution" 클릭
3. Origin 설정:
   - Origin Domain: `serenade-dev-website.s3.ap-northeast-2.amazonaws.com`
   - Origin Access Control 생성 및 연결
4. Default Cache Behavior:
   - Viewer Protocol Policy: "Redirect HTTP to HTTPS"
   - Compress Objects: "Yes"
5. Distribution 생성 후 ID 기록

## 2. GitHub 설정

### Repository Variables 추가

GitHub Repository → Settings → Secrets and variables → Actions → Variables

```
CLOUDFRONT_DISTRIBUTION_ID_DEV: [CloudFront Distribution ID]
```

### Secrets 확인

다음 secrets이 이미 설정되어 있어야 합니다:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## 3. 배포 워크플로우

### Development 배포

```bash
# develop 브랜치로 푸시하면 자동 배포
git checkout develop
git push origin develop
```

### 수동 배포

GitHub Actions → "Deploy Develop to S3" → "Run workflow"

## 4. 환경별 설정

### Environment Variables

| Environment | Branch | S3 Bucket | API URL | Domain |
|-------------|--------|-----------|---------|---------|
| Production | `main` | `serenade-prod-website` | `https://serenade.primadonnadev.site/api/v1` | `serenade-wedding.com` |
| Development | `develop` | `serenade-dev-website` | `https://serenade-dev.primadonnadev.site/api/v1` | `dev.serenade-wedding.com` |

### Build 설정

- **Production**: `NODE_ENV=production`
- **Development**: `NODE_ENV=development`

## 5. 도메인 설정 (선택사항)

### DNS 설정

Route 53 또는 도메인 제공업체에서:

```
dev.serenade-wedding.com CNAME [CloudFront Domain Name]
```

### SSL 인증서

1. AWS Certificate Manager에서 인증서 요청
2. CloudFront 배포 설정에서 인증서 연결

## 6. 모니터링 및 로그

### CloudWatch 로그

- S3 액세스 로그 활성화
- CloudFront 로그 활성화

### GitHub Actions 로그

Repository → Actions → 워크플로우 실행 기록 확인

## 7. 문제 해결

### 일반적인 문제들

#### 1. S3 버킷 액세스 오류
```bash
# 버킷 정책 확인
aws s3api get-bucket-policy --bucket serenade-dev-website

# IAM 권한 확인
aws sts get-caller-identity
```

#### 2. CloudFront 캐시 문제
```bash
# 수동 invalidation
aws cloudfront create-invalidation \
    --distribution-id [DISTRIBUTION_ID] \
    --paths "/*"
```

#### 3. 빌드 실패
- Node.js 버전 확인 (18.x 사용)
- 환경 변수 설정 확인
- 의존성 설치 오류 확인

### 로그 확인 명령어

```bash
# S3 버킷 상태 확인
aws s3 ls s3://serenade-dev-website --recursive

# CloudFront 배포 상태 확인
aws cloudfront get-distribution --id [DISTRIBUTION_ID]

# GitHub Actions 실행 기록
# Repository → Actions 탭에서 확인
```

## 8. 보안 고려사항

### S3 보안
- 퍼블릭 액세스 차단
- CloudFront를 통해서만 접근
- 버킷 정책으로 액세스 제한

### CloudFront 보안
- HTTPS 강제 리디렉션
- Origin Access Control 사용
- 적절한 캐시 정책 설정

### GitHub Secrets
- AWS 액세스 키 정기 로테이션
- 최소 권한 원칙 적용

## 9. 비용 최적화

### S3
- Intelligent Tiering 고려
- 불필요한 백업 파일 정리

### CloudFront
- PriceClass_100 사용 (주요 리전만)
- 적절한 TTL 설정

## 지원

문제가 발생하면 다음을 확인해주세요:

1. AWS CLI 설정 상태
2. GitHub Secrets/Variables 설정
3. 빌드 로그 및 에러 메시지
4. AWS 서비스 상태