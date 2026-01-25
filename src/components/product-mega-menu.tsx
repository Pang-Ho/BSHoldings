'use client';

import productsData from '@/lib/data/products.json';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductMegaMenuProps {
  className?: string;
  onItemClick?: () => void;
}

// JSON 데이터를 4개 컬럼으로 분배
const getColumnLayout = () => {
  const columns: (typeof productsData)[] = [[], [], [], []];

  // Column 1: 특수용 센서, 초음파 센서 (인덱스 0)
  if (productsData[0]) columns[0].push(productsData[0]);
  if (productsData[3]) columns[0].push(productsData[3]);

  // Column 2: 포토 센서, 정전용량 센서 (인덱스 1, 2)
  if (productsData[1]) columns[1].push(productsData[1]);
  if (productsData[2]) columns[1].push(productsData[2]);

  // Column 3: 고온 센서, 레벨 센서 (인덱스 3, 4, 5)
  if (productsData[4]) columns[2].push(productsData[4]);
  if (productsData[5]) columns[2].push(productsData[5]);
  if (productsData[6]) columns[2].push(productsData[6]);

  // Column 4: 엔코더, 레이저 센서, 세이프티, OEM (인덱스 6, 7, 8, 9)
  if (productsData[7]) columns[3].push(productsData[7]);
  if (productsData[8]) columns[3].push(productsData[8]);
  if (productsData[9]) columns[3].push(productsData[9]);

  return columns;
};

export function ProductMegaMenu({
  className,
  onItemClick,
}: ProductMegaMenuProps) {
  const columns = getColumnLayout();

  return (
    <div
      className={cn(
        'w-full bg-white border-y border-[var(--color-grey-300)]',
        className,
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
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-1 flex-col gap-5">
              {column.map((category) => (
                <div key={category.id} className="flex flex-col gap-3">
                  {/* Category Title (1레벨) */}
                  <Link
                    href={`/products/${category.slug}/`}
                    onClick={onItemClick}
                    prefetch={false}
                    className="text-lg font-semibold leading-[1.5] text-[var(--color-text-strong)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {category.name}
                  </Link>

                  {/* Product Items (2레벨) */}
                  {category.products && category.products.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {category.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${category.slug}/${product.slug}/`}
                          onClick={onItemClick}
                          prefetch={false}
                          className="text-[15px] font-normal leading-[1.5] text-[var(--color-grey-750)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {product.name}
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
