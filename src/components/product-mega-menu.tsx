'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductCategory {
  title: string;
  items?: { label: string; href: string }[];
}

interface ProductMegaMenuProps {
  className?: string;
  onItemClick?: () => void;
}

const productCategories: ProductCategory[][] = [
  // Column 1: 특수용 센서
  [
    {
      title: '특수용 센서',
      items: [
        { label: '근접센서', href: '/products?category=proximity' },
        { label: '아날로그 출력 센서', href: '/products?category=analog' },
        { label: '고압용 센서', href: '/products?category=high-pressure' },
        { label: '용접 전용 센서', href: '/products?category=welding' },
        { label: '방폭용 센서', href: '/products?category=explosion-proof' },
        { label: '내 화학용 센서', href: '/products?category=chemical-resistant' },
        { label: 'All metal 센서', href: '/products?category=all-metal' },
      ],
    },
  ],
  // Column 2: 포토센서 & 정전용량 센서
  [
    {
      title: '포토센서',
      items: [
        { label: '포토센서', href: '/products?category=photo' },
        { label: '초소형 포토센서', href: '/products?category=miniature-photo' },
        { label: '원주형 포토 센서', href: '/products?category=cylindrical-photo' },
        { label: '색깔 감지용 포토 센서', href: '/products?category=color-detection' },
        { label: '사각형 포토 센서', href: '/products?category=rectangular-photo' },
      ],
    },
    {
      title: '정전용량 센서',
      items: [
        { label: '정전용량 센서', href: '/products?category=capacitive' },
        { label: '원주형 정전용량 센서', href: '/products?category=cylindrical-capacitive' },
        { label: '사각형 정전용량 센서', href: '/products?category=rectangular-capacitive' },
      ],
    },
  ],
  // Column 3: 초음파 센서, 고온 센서, 레벨 센서
  [
    {
      title: '초음파 센서',
      items: undefined, // Title only
    },
    {
      title: '고온 센서',
      items: [
        { label: '고온 센서', href: '/products?category=high-temperature' },
        { label: '고온용 센서', href: '/products?category=high-temperature-use' },
        { label: '사용온도 범위가 넓은 센서', href: '/products?category=wide-temperature' },
      ],
    },
    {
      title: '레벨 센서',
      items: [
        { label: '레벨 센서', href: '/products?category=level' },
        { label: '레벨 측정용 마이크로파 센서', href: '/products?category=microwave-level' },
        { label: '레벨 측정용 소형 초음파 센서', href: '/products?category=ultrasonic-level' },
      ],
    },
  ],
  // Column 4: 엔코더, 레이저 센서, 세이프티, OEM
  [
    {
      title: '엔코더',
      items: undefined, // Title only
    },
    {
      title: '레이저 센서',
      items: [
        { label: '1D 레이저 변위 센서', href: '/products?category=laser-1d' },
        { label: '2D 라인 레이저 스캐너', href: '/products?category=laser-2d' },
      ],
    },
    {
      title: '세이프티',
      items: [
        { label: '세이프티 라이트커튼', href: '/products?category=safety-light-curtain' },
        { label: '세이프티 릴레이', href: '/products?category=safety-relay' },
      ],
    },
    {
      title: '주문제작용 센서 (OEM)',
      items: undefined, // Title only
    },
  ],
];

export function ProductMegaMenu({ className, onItemClick }: ProductMegaMenuProps) {
  return (
    <div
      className={cn(
        'w-full bg-white border-b border-[var(--color-grey-300)]',
        className
      )}
    >
      <div className="w-full max-w-[1200px] mx-auto pb-10 pt-6">
        {/* Title */}
        <div className="px-0 py-1 mb-4">
          <h2 className="text-2xl font-bold leading-[1.5] text-[var(--color-text-strong)]">
            제품소개
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="flex gap-3">
          {productCategories.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-1 flex-col gap-5">
              {column.map((category, categoryIndex) => (
                <div key={categoryIndex} className="flex flex-col gap-3">
                  {/* Category Title */}
                  <p className="text-lg font-semibold leading-[1.5] text-[var(--color-text-strong)]">
                    {category.title}
                  </p>

                  {/* Category Items */}
                  {category.items && category.items.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {category.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          onClick={onItemClick}
                          className="text-[15px] font-normal leading-[1.5] text-[var(--color-grey-750)] hover:text-[var(--color-primary-500)] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
