# 🎨 애니메이션 가이드

이 프로젝트에 추가된 이쁜 애니메이션들과 사용법을 설명합니다.

## 📦 설치된 라이브러리

- **Framer Motion**: 고급 애니메이션 라이브러리
- **tw-animate-css**: Tailwind CSS 애니메이션 확장

## 🎭 애니메이션 컴포넌트들

### 1. FadeIn

요소가 부드럽게 나타나는 애니메이션

```tsx
<FadeIn delay={0.2} duration={0.8} direction="up">
  <div>내용</div>
</FadeIn>
```

**Props:**

- `delay`: 애니메이션 시작 지연 시간 (초)
- `duration`: 애니메이션 지속 시간 (초)
- `direction`: 방향 ('up', 'down', 'left', 'right')

### 2. ScaleIn

요소가 크기 변화하며 나타나는 애니메이션

```tsx
<ScaleIn delay={0.3} scale={0.8}>
  <div>내용</div>
</ScaleIn>
```

### 3. HoverCard

마우스 호버 시 부드러운 변화 효과

```tsx
<HoverCard hoverScale={1.05} hoverY={-8}>
  <div>카드 내용</div>
</HoverCard>
```

### 4. StaggerContainer & StaggerItem

여러 요소가 순차적으로 나타나는 애니메이션

```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem direction="up">
    <div>첫 번째 아이템</div>
  </StaggerItem>
  <StaggerItem direction="up">
    <div>두 번째 아이템</div>
  </StaggerItem>
</StaggerContainer>
```

### 5. TypingText

타이핑 효과로 텍스트가 나타나는 애니메이션

```tsx
<TypingText delay={0.5} speed={0.08}>
  안녕하세요, 반갑습니다!
</TypingText>
```

### 6. Parallax

스크롤에 따른 패럴랙스 효과

```tsx
<Parallax speed={-0.3}>
  <img src="background.jpg" alt="배경" />
</Parallax>
```

### 7. FloatingElements

주변에 떠다니는 장식 요소들

```tsx
<FloatingElements>
  <div>메인 콘텐츠</div>
</FloatingElements>
```

### 8. ScrollReveal

스크롤 시 나타나는 애니메이션

```tsx
<ScrollReveal delay={0.2} y={50}>
  <div>스크롤하면 나타나는 내용</div>
</ScrollReveal>
```

### 9. Loading Spinners

다양한 로딩 애니메이션

```tsx
<LoadingSpinner size="md" color="#0a98ff" />
<PulseLoader color="#0a98ff" />
<WaveLoader color="#0a98ff" />
```

## 🎨 CSS 애니메이션 클래스들

### 호버 효과

```css
.card-hover-effect /* 카드 호버 시 3D 효과 */
.hover-lift /* 호버 시 위로 떠오르는 효과 */
.btn-animated /* 버튼 클릭 시 파동 효과 */
```

### 시각적 효과

```css
.text-gradient /* 그라데이션 텍스트 */
.text-shimmer /* 반짝이는 텍스트 */
.neon-glow /* 네온 글로우 효과 */
.neon-border /* 네온 테두리 효과 */
```

### 애니메이션

```css
.animate-float /* 떠다니는 애니메이션 */
.animate-pulse-glow /* 맥박 글로우 */
.animate-gradient /* 그라데이션 이동 */
.wave-effect /* 파도 효과 */
```

## 🚀 적용된 애니메이션들

### 메인 페이지

1. **헤더**: 위에서 슬라이드 다운
2. **Hero 섹션**:
   - 타이핑 애니메이션으로 메인 텍스트
   - 플로팅 요소들로 장식
   - 스크롤 인디케이터 애니메이션
3. **Product 섹션**:
   - 제목에 그라데이션 효과
   - 탭과 칩들 순차 등장
   - 제품 카드 호버 효과
   - 버튼 클릭 애니메이션
4. **하단 섹션**:
   - 패럴랙스 배경
   - 카드들 스태거 애니메이션
   - 네온 글로우 효과

### 성능 최적화

- `viewport={{ once: true }}`: 한 번만 실행으로 성능 향상
- `will-change` 속성으로 GPU 가속 활용
- `transform3d`로 하드웨어 가속 활용

## 🎯 사용 팁

1. **애니메이션 과용 금지**: 너무 많은 애니메이션은 사용자 경험을 해칠 수 있습니다.
2. **성능 고려**: 모바일 기기에서도 부드럽게 작동하도록 최적화했습니다.
3. **접근성**: `prefers-reduced-motion`을 고려한 애니메이션 설계
4. **일관성**: 전체 사이트에서 일관된 애니메이션 스타일 유지

## 🔧 커스터마이징

애니메이션을 수정하려면:

1. `src/components/animations/` 폴더의 컴포넌트 수정
2. `src/app/globals.css`의 CSS 애니메이션 수정
3. 새로운 애니메이션 컴포넌트 추가 시 `index.ts`에 export 추가

참고 사이트에서 영감을 받아 현대적이고 부드러운 애니메이션들을 구현했습니다!
