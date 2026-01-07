'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { Chip, ChipGroup, ChipGroupItem } from '@/components/ui/chip';
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from '@/components/ui/custom-tabs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import productImage from '../../../public/images/productImage.jpg';
import separatorIcon from '../../../public/icons/separatorIcon.svg';
import Image from 'next/image';

const productCategories = [
  '특수용 센서',
  '포토 센서',
  '정전용량 센서',
  '초음파 센서',
  '고온 센서',
  '레벨 센서',
  '엔코더',
  '레이저 센서',
  '세이프티',
  '주문제작용 센서 (OEM)',
];

const productChips = [
  '근접센서',
  '아날로그 출력 센서',
  '고압용 센서',
  '용접 전용 센서',
  '방폭용 센서',
  '내 화학용 센서',
  'All metal 센서',
];

const products = Array(8).fill(null).map((_, i) => ({
  id: `slc-${i + 1}`,
  name: 'SLC(9) Series',
  description: '세이프티 라이트커튼',
  tags: ['손가락감지', '라이트커튼', '세이프티'],
  isNew: i === 0,
  isSelected: i === 1,
}));

export default function ProductsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '특수용 센서';
  const [selectedCategory, setSelectedCategory] = React.useState(category);
  const [selectedChip, setSelectedChip] = React.useState('근접센서');

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />
      
      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
            특수용 센서
          </p>
          <div className="h-3 w-full" />
          <div className="flex gap-2 items-center w-full overflow-x-auto">
            <CustomTabs value={selectedCategory} onValueChange={setSelectedCategory} variant="horizontal">
              <CustomTabsList variant="horizontal" className="gap-0 flex-nowrap">
                {productCategories.map((cat) => (
                  <CustomTabsTrigger
                    key={cat}
                    value={cat}
                    variant="horizontal"
                    className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
                  >
                    {cat}
                  </CustomTabsTrigger>
                ))}
              </CustomTabsList>
            </CustomTabs>
          </div>
          <div className="h-8 md:h-12 w-full" />
          <div className="flex gap-1 md:gap-2 items-start w-full flex-wrap">
            <ChipGroup value={selectedChip} onValueChange={setSelectedChip} size="large">
              {productChips.map((chip) => (
                <ChipGroupItem key={chip} value={chip}>
                  {chip}
                </ChipGroupItem>
              ))}
            </ChipGroup>
          </div>
          <div className="h-5 w-full" />
          <div className="flex flex-wrap gap-4 md:gap-6 items-start w-full justify-center lg:justify-start">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white border flex flex-col items-center overflow-clip relative rounded-2xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[282px] ${
                  product.isSelected
                    ? 'border-[var(--color-text-strong)]'
                    : 'border-[var(--color-button-gray-outlined-border-default)]'
                }`}
              >
                <div className="flex h-[200px] items-center justify-center p-5 w-full">
                  <div className="aspect-[310/392] h-full relative">
                    <Image
                      alt=""
                      className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                      src={productImage}
                    />
                  </div>
                </div>
                <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col gap-1 items-start p-5 w-full">
                  <div className="flex items-end">
                    <p className="font-bold leading-[1.25] text-xl text-[var(--color-text-strong)] text-center whitespace-nowrap">
                      {product.name}
                    </p>
                    {product.isNew && (
                      <div className="flex items-center justify-center px-2 py-1 rounded-[50px]">
                        <Badge variant="destructive" className="text-xs font-semibold">
                          NEW
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="font-normal leading-6 text-sm text-[var(--color-text-basic)] whitespace-nowrap">
                    {product.description}
                  </p>
                </div>
                <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex gap-2 items-center p-5 w-full">
                  {product.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <p className="font-bold leading-[1.25] text-[13px] text-[var(--color-primary-600)] text-center whitespace-nowrap">
                        {tag}
                      </p>
                      {idx < product.tags.length - 1 && (
                        <div className="h-3 relative w-0">
                          <div className="absolute inset-[0_-0.5px]">
                            <img
                              alt=""
                              className="block max-w-none size-full"
                              src={separatorIcon}
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex items-start justify-end pb-5 pt-3 px-5 w-full">
                  <Button
                    variant="default"
                    className="bg-[var(--color-grey-850)] text-white min-h-9 px-3 py-2 rounded-md text-sm font-bold"
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>자세히보기</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
