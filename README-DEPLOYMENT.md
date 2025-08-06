# 배포 가이드

이 프로젝트는 Next.js 정적 사이트로 AWS S3에 자동 배포됩니다.

## 🚀 배포 방법

### 1. 로컬에서 수동 배포

```bash
# 개발 환경 배포
npm run deploy

# 프로덕션 환경 배포
npm run deploy:prod
```

### 2. GitHub Actions 자동 배포

`main` 브랜치에 푸시하면 자동으로 배포됩니다.

## ⚙️ 설정 방법

### AWS 자격증명 설정

#### 로컬 개발환경
```bash
# AWS CLI 설정
aws configure
```

#### GitHub Actions
Repository Settings → Secrets and variables → Actions에서 다음 설정:

**Secrets:**
- `AWS_ACCESS_KEY_ID`: AWS 액세스 키
- `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 키

**Variables (선택사항):**
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront 배포 ID

### S3 버킷 설정

현재 설정된 버킷: `serenade-prod-website`

버킷 정책 예시:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::serenade-prod-website/*"
    }
  ]
}
```

## 📁 프로젝트 구조

```
├── scripts/
│   └── deploy-to-s3.sh          # S3 배포 스크립트
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions 워크플로우
├── out/                         # 빌드 결과물 (자동 생성)
├── .env.example                 # 환경변수 예시
└── README-DEPLOYMENT.md         # 배포 가이드
```

## 🔧 배포 과정

1. **빌드**: `next build` 실행하여 정적 파일 생성
2. **업로드**: S3 버킷에 파일 동기화
3. **캐시설정**: 
   - 정적 파일: 1년 캐시 (`max-age=31536000`)
   - HTML 파일: 5분 캐시 (`max-age=300`)
4. **백업**: 이전 버전 자동 백업
5. **CloudFront**: 캐시 무효화 (설정된 경우)

## 🌐 접속 URL

- **S3 직접 접속**: `https://serenade-prod-website.s3.ap-northeast-2.amazonaws.com/index.html`
- **커스텀 도메인**: `https://serenade-wedding.com` (next.config.ts에서 설정)

## ⚠️ 주의사항

1. AWS 자격증명은 최소한의 권한만 부여하세요
2. S3 버킷 이름은 `scripts/deploy-to-s3.sh` 또는 `package.json`에서 변경 가능합니다
3. CloudFront 사용 시 캐시 무효화에 추가 비용이 발생할 수 있습니다
4. 환경변수 파일(`.env`)은 절대 커밋하지 마세요

## 🐛 문제해결

### 배포 실패 시
1. AWS 자격증명 확인
2. S3 버킷 접근 권한 확인
3. 빌드 오류 확인 (`npm run build`)

### 사이트 접속 안될 시
1. S3 버킷 정책 확인
2. 정적 웹사이트 호스팅 설정 확인
3. CloudFront 설정 확인 (사용하는 경우)