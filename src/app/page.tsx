'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChipGroup, ChipGroupItem } from '@/components/ui/chip';
import {
  CustomTabs,
  CustomTabsList,
  CustomTabsTrigger,
} from '@/components/ui/custom-tabs';

import heroImage from '../../public/images/hero.jpg';

import Image from 'next/image';
import arrowRightIcon from '../../public/icons/arrowRightIcon.svg';
import chatProcessingIcon from '../../public/icons/chatProcessingIcon.svg';
import chevronDownIcon from '../../public/icons/chevronDownIcon.svg';
import separatorIcon from '../../public/icons/separatorIcon.svg';
import productImage from '../../public/images/productImage.jpg';

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
  '주문제작 센서(OEM)',
];

const productChips = [
  '근접센서',
  '아날로그 출력 센서',
  '고압용 센서',
  '용접전용 센서',
  '방폭용 센서',
  '내 화학용 센서',
  'All metal 센서',
];

const products = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: `slc-${i + 1}`,
    name: 'SLC(9) Series',
    description: '세이프티 라이트커튼',
    tags: ['손가락감지', '라이트커튼', '세이프티'],
    isNew: i === 0,
  }));

export default function HomePage() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = React.useState('특수용 센서');
  const [selectedChip, setSelectedChip] = React.useState('근접센서');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // 초기 상태 확인
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} isTransparent={!isScrolled} />

      {/* Hero Section - Combined with Gradient */}
      <div className="relative flex flex-col h-screen items-center w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            alt="heroImage"
            className="absolute max-w-none object-cover object-[50%_50%] size-full"
            src={heroImage}
          />
          <div className="absolute bg-black/25 inset-0" />
        </div>
        <div className="relative flex flex-col grow items-center justify-between pb-3 pt-20 md:pt-40 lg:pt-[280px] px-4 w-full max-w-[1200px] z-10">
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-20 items-center leading-6 text-white text-center w-full">
            <div className="font-extrabold relative text-3xl md:text-5xl lg:text-[80px] leading-normal">
              <p className="mb-0">시작부터 완성까지</p>
              <p>모든 자동화 과정에 함께</p>
            </div>
            <p className="font-medium relative text-lg md:text-2xl lg:text-[42px] tracking-[-0.84px]">
              The Best Sensors & Solutions
            </p>
          </div>
          <div className="relative size-10 md:size-12 lg:size-[60px]">
            <Image
              alt=""
              className="block max-w-none size-full"
              src={chevronDownIcon}
            />
          </div>
        </div>

        {/* Gradient Section at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center px-4 py-12 md:py-16 lg:py-20 w-full z-10 bg-hero-bottom-gradient"
          // style={{
          //   backgroundImage:
          //     "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1920 250\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-261.15 -5.0224e-14 -4.9589e-15 -53.558 960 395.83)\\'><stop stop-color=\\'rgba(10,152,255,1)\\' offset=\\'0.18175\\'/><stop stop-color=\\'rgba(14,121,198,1)\\' offset=\\'0.26131\\'/><stop stop-color=\\'rgba(18,89,141,1)\\' offset=\\'0.34088\\'/><stop stop-color=\\'rgba(20,73,112,1)\\' offset=\\'0.38066\\'/><stop stop-color=\\'rgba(22,58,83,1)\\' offset=\\'0.42044\\'/><stop stop-color=\\'rgba(24,42,55,1)\\' offset=\\'0.46022\\'/><stop stop-color=\\'rgba(26,26,26,1)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')",
          // }}
        >
          <div className="font-bold leading-6 text-lg md:text-2xl lg:text-[30px] text-white text-center w-full max-w-[1200px] leading-normal">
            <p className="mb-0">자동화 제품과 자동화 설비 컨설팅</p>
            <p>센서제작에 이르는 고객 맞춤형 서비스</p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-white flex flex-col min-h-[899px] items-center w-full">
        <div className="flex flex-col gap-3 items-start pb-0 pt-12 md:pt-16 lg:pt-[100px] px-4 md:px-6 lg:px-0 w-full max-w-[1200px]">
          <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] w-full">
            Product
          </p>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full">
            <div className="flex flex-col gap-[10px] items-start pb-0 pt-0 lg:pt-[54px] px-0 w-full lg:w-[200px]">
              <CustomTabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                variant="vertical"
                className="w-full"
              >
                <CustomTabsList variant="vertical" className="w-full">
                  {productCategories.map((category) => (
                    <CustomTabsTrigger
                      key={category}
                      value={category}
                      variant="vertical"
                      className="w-full"
                    >
                      {category}
                    </CustomTabsTrigger>
                  ))}
                </CustomTabsList>
              </CustomTabs>
            </div>
            <div className="flex flex-col grow items-start w-full">
              <div className="flex gap-2 md:gap-[6px] items-center w-full flex-wrap">
                <ChipGroup
                  value={selectedChip}
                  onValueChange={setSelectedChip}
                  size="large"
                >
                  {productChips.map((chip) => (
                    <ChipGroupItem key={chip} value={chip}>
                      {chip}
                    </ChipGroupItem>
                  ))}
                </ChipGroup>
              </div>
              <div className="h-5 w-full" />
              <div className="flex gap-4 md:gap-6 items-start w-full flex-wrap justify-center lg:justify-start">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-center overflow-clip relative rounded-2xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[282px]"
                  >
                    <div className="flex h-[200px] items-center justify-center w-full">
                      <div className="h-40 relative w-[126px]">
                        <Image
                          alt=""
                          className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                          src={productImage}
                        />
                      </div>
                    </div>
                    <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col gap-1 items-start p-5 w-full">
                      <div className="flex gap-1 items-end">
                        <p className="font-bold leading-[1.25] text-xl text-[var(--color-text-strong)] text-center whitespace-nowrap">
                          {product.name}
                        </p>
                        {product.isNew && (
                          <div className="flex items-center justify-center px-2 py-1 rounded-[50px]">
                            <Badge
                              variant="destructive"
                              className="text-xs font-semibold"
                            >
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
                                <Image
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
        </div>
      </div>

      {/* Bottom Hero Section */}
      <div className="relative flex flex-col min-h-[500px] md:min-h-[700px] lg:min-h-[899px] items-center w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            alt=""
            className="absolute max-w-none object-cover object-[50%_50%] size-full"
            src={heroImage}
          />
          <div className="absolute bg-[rgba(26,26,26,0.4)] inset-0" />
        </div>
        <div className="relative flex flex-col gap-12 md:gap-20 lg:gap-[280px] items-start pb-12 md:pb-16 lg:pb-0 pt-12 md:pt-16 lg:pt-[100px] px-4 md:px-6 lg:px-0 w-full max-w-[1200px] z-10">
          <div className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-white w-full">
            <p className="mb-0">자동화의</p>
            <p className="mb-0">모든 과정에 함께하는</p>
            <p>파트너, BS 홀딩스</p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-start justify-end w-full gap-4 md:gap-6">
            <div className="bg-[rgba(1,16,37,0.6)] flex flex-col gap-3 min-h-[200px] md:h-[320px] items-start justify-end p-6 md:p-10 w-full md:w-[340px]">
              <div className="flex gap-1 items-center">
                <p className="font-bold leading-[1.25] text-xl md:text-2xl text-white text-center whitespace-nowrap">
                  찾아오시는 길
                </p>
                <div className="relative size-5 md:size-6">
                  <Image
                    alt=""
                    className="block max-w-none size-full"
                    src={arrowRightIcon}
                  />
                </div>
              </div>
              <div className="font-semibold leading-6 min-w-full text-sm md:text-base text-white w-[min-content]">
                <p className="mb-0">경기도 안산시 단원구 원포공원 1로 59</p>
                <p>B동 201호</p>
              </div>
            </div>
            <div className="bg-[rgba(10,152,255,0.6)] flex flex-col gap-3 min-h-[200px] md:h-[320px] items-start justify-end p-6 md:p-10 w-full md:w-[340px]">
              <div className="flex gap-1 items-center">
                <p className="font-bold leading-[1.25] text-xl md:text-2xl text-white text-center whitespace-nowrap">
                  고객센터
                </p>
                <div className="relative size-5 md:size-6">
                  <Image
                    alt=""
                    className="block max-w-none size-full"
                    src={chatProcessingIcon}
                  />
                </div>
              </div>
              <div className="font-semibold leading-6 min-w-full text-sm md:text-base text-white w-[min-content]">
                <p className="mb-0">Tel: 031-411-5011</p>
                <p className="text-xs md:text-base">
                  (09:00 ~ 18:00 / 토, 일, 공휴일 휴무)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
