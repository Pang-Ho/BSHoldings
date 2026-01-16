'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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

import productsData from '@/lib/data/products.json';

// 타입 정의
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  isNew: boolean;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

const categories = productsData as Category[];

export default function HomePage() {
  const pathname = usePathname();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categories[0].id,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState<
    number | null
  >(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // 선택된 카테고리 가져오기
  const selectedCategory =
    categories.find((cat) => cat.id === selectedCategoryId) || categories[0];

  // 서브카테고리 목록
  const subCategories = selectedCategory.subCategories;

  // 선택된 서브카테고리 가져오기
  const selectedSubCategory = subCategories.find(
    (sub) => sub.id === selectedSubCategoryId,
  );

  // 표시할 제품들 (서브카테고리 선택시 해당 제품만, 아니면 전체)
  const displayProducts = selectedSubCategory
    ? selectedSubCategory.products
    : subCategories.flatMap((sub) => sub.products);

  // // 카테고리 변경시 첫 번째 서브카테고리 선택
  // React.useEffect(() => {
  //   const newCategory = categories.find((cat) => cat.id === selectedCategoryId);
  //   if (newCategory && newCategory.subCategories.length > 0) {
  //     setSelectedSubCategoryId(newCategory.subCategories[0].id);
  //   }
  // }, [selectedCategoryId]);

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
          <video
            className="absolute max-w-none object-cover object-center size-full blur-[2px]"
            src="/video/riftek-main.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute bg-black/25 inset-0" />
        </div>
        <div className="relative flex flex-col grow items-center justify-between pb-12 md:pb-16 lg:pb-20 pt-20 md:pt-40 lg:pt-[280px] px-4 w-full max-w-[1200px] z-10">
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-20 items-center leading-6 text-white text-center w-full">
            <div className="font-extrabold relative text-3xl md:text-5xl lg:text-[80px] leading-normal">
              <p className="mb-0">시작부터 완성까지</p>
              <p>모든 자동화 과정에 함께</p>
            </div>
            <p className="font-medium relative text-lg md:text-2xl lg:text-[42px] tracking-[-0.84px]">
              The Best Sensors & Solutions
            </p>
          </div>
          {/* Scroll Down Indicator */}
          <div className="relative size-10 md:size-12 lg:size-[40px] animate-bounce">
            <Image
              alt="스크롤을 내려주세요"
              className="block max-w-none size-full opacity-80"
              src={chevronDownIcon}
            />
          </div>
        </div>
      </div>

      {/* Gradient Text Section */}
      <div className="flex flex-col items-center justify-center px-4 py-12 md:py-16 lg:py-20 w-full bg-hero-bottom-gradient">
        <div className="font-bold text-lg md:text-2xl lg:text-[30px] leading-normal text-white text-center w-full max-w-[1200px]">
          <p className="mb-0">자동화 제품과 자동화 설비 컨설팅</p>
          <p>센서제작에 이르는 고객 맞춤형 서비스</p>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-white flex flex-col min-h-[899px] items-center w-full">
        <div className="flex flex-col gap-3 items-start pb-0 pt-12 md:pt-16 lg:pt-[100px] px-4 md:px-6 lg:px-0 w-full max-w-[1200px]">
          <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] w-full">
            Product
          </p>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full">
            {/* 왼쪽 카테고리 탭 */}
            <div className="flex flex-col gap-[10px] items-start pb-0 pt-0 lg:pt-[54px] px-0 w-full lg:w-[200px]">
              <CustomTabs
                value={String(selectedCategoryId)}
                onValueChange={(val) => setSelectedCategoryId(Number(val))}
                variant="vertical"
                className="w-full"
              >
                <CustomTabsList variant="vertical" className="w-full">
                  {categories.map((category) => (
                    <CustomTabsTrigger
                      key={category.id}
                      value={String(category.id)}
                      variant="vertical"
                      className="w-full"
                    >
                      {category.name}
                    </CustomTabsTrigger>
                  ))}
                </CustomTabsList>
              </CustomTabs>
            </div>
            {/* 오른쪽 서브카테고리 칩 + 제품 캐러셀 */}
            <div className="flex flex-col grow items-start w-full lg:w-auto">
              <div className="flex gap-2 md:gap-[6px] items-center w-full flex-wrap">
                <ChipGroup
                  value={String(selectedSubCategoryId || '')}
                  onValueChange={(val) =>
                    setSelectedSubCategoryId(
                      String(selectedSubCategoryId) === val
                        ? null
                        : val
                        ? Number(val)
                        : null,
                    )
                  }
                  size="large"
                >
                  {subCategories.map((subCat) => (
                    <ChipGroupItem key={subCat.id} value={String(subCat.id)}>
                      {subCat.name}
                    </ChipGroupItem>
                  ))}
                </ChipGroup>
              </div>
              <div className="h-5 w-full" />
              {/* 제품 캐러셀 */}
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                  slidesToScroll: 1,
                }}
                className="w-full lg:max-w-[770px] xl:max-w-[960px]"
              >
                <CarouselContent>
                  {displayProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="md:basis-[40%] lg:basis-[29%]"
                    >
                      <div className="bg-white border border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-center overflow-clip relative rounded-2xl w-full">
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
                        <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex gap-2 items-center p-5 w-full flex-wrap">
                          {product.tags.map((tag: string, idx: number) => (
                            <React.Fragment key={`${tag}-${idx}`}>
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
                            <Link
                              href={`/products/${selectedCategory.slug}/${
                                subCategories.find((sub) =>
                                  sub.products.some((p) => p.id === product.id),
                                )?.slug
                              }/${product.slug}`}
                            >
                              자세히보기
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex -left-4 bg-white border-[var(--color-button-gray-outlined-border-default)]" />
                <CarouselNext className="hidden lg:flex -right-4 bg-white border-[var(--color-button-gray-outlined-border-default)]" />
              </Carousel>
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
            priority
            placeholder="blur"
          />
          <div className="absolute bg-[rgba(26,26,26,0.4)] inset-0" />
        </div>
        <div className="relative flex flex-col gap-12 md:gap-20 lg:gap-[280px] items-start pb-12 md:pb-16 lg:pb-0 pt-12 md:pt-16 lg:pt-[100px] px-4 md:px-6 lg:px-0 w-full max-w-[1200px] z-10">
          <div className="font-semibold leading-[1.5] text-2xl md:text-3xl lg:text-[36px] text-white w-full">
            <p className="mb-0">자동화의</p>
            <p className="mb-0">모든 과정에 함께하는</p>
            <p>파트너, BS 홀딩스</p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-start justify-end w-full gap-4 md:gap-0">
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
