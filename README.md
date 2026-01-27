# BS Holdings 웹사이트

산업용 센서 전문 기업 BS Holdings의 공식 웹사이트입니다.

https://www.bestsensor.kr

## 기술 스택

### 프레임워크 & 라이브러리

| 분류              | 기술                 | 버전    |
| ----------------- | -------------------- | ------- |
| **프레임워크**    | Next.js (App Router) | 16.1.1  |
| **UI 라이브러리** | React                | 19.2.3  |
| **언어**          | TypeScript           | 5.x     |
| **스타일링**      | Tailwind CSS         | 4.1.18  |
| **UI 컴포넌트**   | shadcn/ui + Radix UI | -       |
| **애니메이션**    | Framer Motion        | 12.26.2 |
| **아이콘**        | Lucide React         | 0.562.0 |

### 개발 도구

- **패키지 매니저**: pnpm
- **빌드 도구**: Next.js (React Compiler 활성화)
- **코드 품질**: ESLint
- **CSS 처리**: PostCSS + Tailwind CSS v4

### 유틸리티 라이브러리

- `class-variance-authority` - 컴포넌트 variant 관리
- `clsx` + `tailwind-merge` - 조건부 클래스 병합
- `tw-animate-css` - Tailwind 애니메이션 유틸리티

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── page.tsx        # 메인 페이지
│   ├── products/       # 제품 소개 페이지
│   ├── company/        # 회사 소개 페이지
│   └── location/       # 오시는 길 페이지
├── components/
│   ├── ui/             # shadcn/ui 기반 컴포넌트
│   ├── header.tsx      # 헤더 네비게이션
│   └── footer.tsx      # 푸터
└── lib/                # 유틸리티 함수
```

## 개발 이력

### 1. 프로젝트 초기 설정

- Next.js 16 + React 19 프로젝트 초기화
- TypeScript, Tailwind CSS v4 설정
- ESLint 및 개발 환경 구성

### 2. 디자인 토큰 추출

- Figma에서 color 토큰을 `extractCssColorVariables()` 함수를 이용하여 추출
- 추출한 CSS 변수를 `globals.css`에 적용

### 3. UI 컴포넌트 개발

- **Button**: shadcn/ui에 커스텀 CSS 추가
- **Chip/ChipGroup**: shadcn/ui에 없어서 새로 제작
- **Dropdown**: Radix Select에 커스텀 CSS 추가
- **Tabs**: Radix 탭 컴포넌트, 2가지 variant 지원
- **Tooltip**: shadcn/ui Tooltip에 커스텀 CSS 추가
- **NavigationMenu**: 메가 메뉴 지원 네비게이션

### 4. 페이지 개발

- **헤더**: 반응형 네비게이션, 메가 메뉴, 모바일 햄버거 메뉴
- **메인 페이지**: 히어로 비디오, 제품 소개 섹션
- **제품 페이지**: 제품 목록, 상세 페이지, PDF 다운로드
- **회사 소개**: 회사 정보 및 이미지
- **오시는 길**: 위치 정보 페이지

### 5. 스타일링 & 반응형

- `cva`, `cn` 함수를 이용한 컴포넌트 스타일링
- `sm`, `md`, `lg` breakpoint로 모바일, 태블릿, PC 반응형 지원

### 6. 데이터 관리

- 제품 데이터 변경이 필요없어 하나의 JSON 파일로 관리

### 7. SEO 최적화

- 메타 태그 및 Open Graph 설정
- Google Search Console, Naver 검색마스터 등록

### 8. 배포 & 인프라

**AWS 구성**

- S3: 정적 웹페이지 빌드 파일 호스팅
- CloudFront: CDN 배포
- Route 53: DNS 관리
- 가비아 도메인을 Route 53에 연결

**정적 배포 트러블슈팅**

`pnpm start`가 아닌 정적 빌드(`output: 'export'`) 방식이라 여러 이슈 발생:

1. **새로고침 시 404 오류**
   - CloudFront에서 403/404 에러 시 `index.html`로 리다이렉트 설정
   - 하지만 URL은 유지되나 홈 화면으로 이동하는 문제 발생

2. **라우팅 문제 해결**
   - 정적 페이지는 각 경로마다 `index.html`이 생성되어야 함
   - Next.js에서 `/location`과 `/location/`이 다르게 처리됨
   - `trailingSlash: true` 설정으로 후자 방식 사용

3. **네비게이션 이동 불가**
   - S3 직접 접속은 정상이나 CloudFront 경유 시 네비게이션 작동 안 함
   - 정적 페이지 + `prefetch` 조합에서 버그 발생
   - `prefetch: false` 설정으로 해결

4. **SEO 처리**
   - 최종 도메인 주소 기준으로 SEO 메타 태그 설정
