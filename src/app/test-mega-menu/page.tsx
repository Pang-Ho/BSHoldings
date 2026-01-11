'use client';

import { ProductMegaMenu } from '@/components/product-mega-menu';
import { Header } from '@/components/header';

export default function TestMegaMenuPage() {
  return (
    <div className="min-h-screen bg-[var(--color-grey-100)]">
      {/* Header with navigation */}
      <Header currentPath="/products" />

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Standalone ProductMegaMenu component test */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-4 mb-4">
          <h1 className="text-2xl font-bold text-[var(--color-text-strong)]">
            ProductMegaMenu 컴포넌트 테스트
          </h1>
          <p className="text-[var(--color-grey-600)] mt-2">
            아래는 독립적으로 렌더링된 ProductMegaMenu 컴포넌트입니다.
          </p>
        </div>

        {/* ProductMegaMenu component */}
        <ProductMegaMenu />
      </section>

      {/* Info section */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[var(--color-text-strong)] mb-4">
              컴포넌트 정보
            </h2>
            <ul className="space-y-2 text-[var(--color-grey-750)]">
              <li>
                <strong>파일 위치:</strong> src/components/product-mega-menu.tsx
              </li>
              <li>
                <strong>사용 방법:</strong> Header 컴포넌트에서 제품소개 메뉴 클릭시 표시됨
              </li>
              <li>
                <strong>Props:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>- className: 추가 CSS 클래스</li>
                  <li>- onItemClick: 아이템 클릭시 콜백 함수</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Test with callback */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-4 mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
            onItemClick 콜백 테스트
          </h2>
          <p className="text-[var(--color-grey-600)] mt-2">
            아래 메뉴에서 아이템을 클릭하면 alert가 표시됩니다.
          </p>
        </div>
        <ProductMegaMenu
          onItemClick={() => alert('아이템이 클릭되었습니다!')}
        />
      </section>
    </div>
  );
}
