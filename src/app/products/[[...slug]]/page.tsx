'use client';

import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import * as React from 'react';

import { FadeIn } from '@/components/animations';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  CustomDropdown,
  CustomDropdownContent,
  CustomDropdownItem,
  CustomDropdownTrigger,
  CustomDropdownValue,
} from '@/components/ui/custom-dropdown';
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from '@/components/ui/custom-tabs';

import Image from 'next/image';
import separatorIcon from '../../../../public/icons/separatorIcon.svg';

import productsData from '@/lib/data/products.json';

// 타입 정의
interface DownloadModel {
  name: string;
  fileName: string;
  fileUrl?: string;
}

interface DownloadItem {
  category: string;
  type: string;
  name: string;
  models: DownloadModel[];
}

interface VideoConfig {
  enabled: boolean;
  youtubeUrl?: string;
}

interface DownloadsConfig {
  enabled: boolean;
  items?: DownloadItem[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  isNew: boolean;
  mainImage?: string;
  detailDescriptionKo?: string[];
  detailDescriptionEn?: string[];
  features?: string[];
  models?: { name: string; image?: string }[];
  video?: VideoConfig;
  downloads?: DownloadsConfig;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

// 데이터 찾기 헬퍼 함수들
function findCategory(categorySlug: string): Category | undefined {
  return (productsData as Category[]).find((cat) => cat.slug === categorySlug);
}

function findProduct(
  category: Category,
  productSlug: string,
): Product | undefined {
  return category.products.find((prod) => prod.slug === productSlug);
}

// YouTube URL에서 embed URL로 변환하는 함수
function getYouTubeEmbedUrl(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

// 파일 타입에 따른 스타일 반환
function getFileTypeStyle(type: string): {
  bg: string;
  border: string;
  text: string;
} {
  const typeUpper = type.toUpperCase();
  if (typeUpper === 'PDF') {
    return {
      bg: 'bg-[var(--color-error-100)]',
      border: 'border-[var(--color-error-300)]',
      text: 'text-[var(--color-error-600)]',
    };
  }
  if (typeUpper === 'DWG' || typeUpper === 'STEP' || typeUpper === 'STP') {
    return {
      bg: 'bg-[var(--color-success-100)]',
      border: 'border-[var(--color-success-300)]',
      text: 'text-[var(--color-success-600)]',
    };
  }
  return {
    bg: 'bg-[var(--color-info-100)]',
    border: 'border-[var(--color-info-300)]',
    text: 'text-[var(--color-info-600)]',
  };
}

// 미리보기 가능한 파일 타입인지 확인
function isPreviewable(fileName: string): boolean {
  const ext = fileName.toLowerCase().split('.').pop();
  return ext === 'pdf';
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function ProductsPage({ params }: PageProps) {
  const pathname = usePathname();
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug || [];

  // URL 파싱 (2레벨 구조: /products/[category]/[product])
  const categorySlug = slug[0];
  const productSlug = slug[1];

  // 데이터 찾기
  const category = categorySlug ? findCategory(categorySlug) : null;
  const product =
    category && productSlug ? findProduct(category, productSlug) : null;

  // 유효하지 않은 경로 체크
  if (categorySlug && !category) {
    notFound();
  }
  if (productSlug && !product) {
    notFound();
  }

  // 2레벨 (제품 상세)
  if (product && category) {
    return (
      <ProductDetailView
        pathname={pathname}
        category={category}
        product={product}
      />
    );
  }

  // 1레벨 (리스트 뷰)
  return <ProductListView pathname={pathname} category={category ?? null} />;
}

// 제품 리스트 뷰 컴포넌트
function ProductListView({
  pathname,
  category,
}: {
  pathname: string;
  category: Category | null;
}) {
  const categories = productsData as Category[];

  // 선택된 카테고리 (기본값: 첫 번째 카테고리)
  const selectedCategory = category || categories[0];

  // 표시할 제품들
  const displayProducts = selectedCategory.products;

  // 페이지 타이틀
  const pageTitle = selectedCategory.name;

  // 카테고리 탭 변경 시 FadeIn 애니메이션 비활성화
  // 첫 마운트 시에만 애니메이션 적용, 이후 카테고리 변경 시에는 비활성화
  const isInitialMount = React.useRef(true);
  const [disableTabAnimation, setDisableTabAnimation] = React.useState(false);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // 카테고리가 변경되면 애니메이션 비활성화
      setDisableTabAnimation(true);
    }
  }, [selectedCategory.slug]);

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1248px]">
          <FadeIn delay={0.25} direction="left">
            <p className="font-semibold leading-normal text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
              {pageTitle}
            </p>
          </FadeIn>
          <div className="h-3 w-full" />

          {/* 1레벨 탭 */}
          <FadeIn delay={0.2} className="w-full" disabled={disableTabAnimation}>
            <div className="flex gap-2 w-full overflow-x-auto overflow-y-hidden h-12 items-start">
              <CustomTabs
                value={selectedCategory.slug}
                onValueChange={() => {}}
                variant="horizontal"
              >
                <CustomTabsList
                  variant="horizontal"
                  className="gap-0 flex-nowrap"
                >
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/products/${cat.slug}`}>
                      <CustomTabsTrigger
                        value={cat.slug}
                        variant="horizontal"
                        className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
                      >
                        {cat.name}
                      </CustomTabsTrigger>
                    </Link>
                  ))}
                </CustomTabsList>
              </CustomTabs>
            </div>
          </FadeIn>

          {/* <div className="h-4 md:h-12 w-full" /> */}

          {/* 2레벨 칩 */}
          {/* <FadeIn delay={0.3} className="w-full">
            <div className="flex gap-1 md:gap-2 items-start w-full flex-nowrap overflow-x-auto overflow-y-hidden h-9 md:h-12 items-start ">
              <ChipGroup
                value={selectedSubCategory?.slug || ''}
                onValueChange={(v) => {
                  if (selectedSubCategory?.slug === v)
                    router.push(`/products/${selectedCategory.slug}`);
                  else router.push(`/products/${selectedCategory.slug}/${v}`);
                }}
                size="large"
              >
                {selectedCategory.subCategories.map((sub) => (
                  <ChipGroupItem
                    key={sub.id}
                    value={sub.slug}
                    className="h-[30px] md:h-[34px] text-sm md:text-base lg:text-lg"
                  >
                    {sub.name}
                  </ChipGroupItem>
                ))}
              </ChipGroup>
            </div>
          </FadeIn> */}

          <div className="h-5 w-full" />

          {/* 제품 그리드 */}
          <FadeIn delay={0.4} duration={0.8} className="w-full">
            <div className="flex flex-wrap gap-4 md:gap-6 items-start w-full justify-start">
              {displayProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-white border-2 flex flex-col items-center overflow-clip relative rounded-2xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[282px] border-[var(--color-button-gray-outlined-border-default)] hover:border-[var(--color-Text-Strong)] transition-colors duration-200"
                >
                  <div className="flex h-[200px] items-center justify-center p-5 w-full">
                    <div className="w-full h-full relative">
                      {prod.mainImage && (
                        <Image
                          alt=""
                          // className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                          src={prod.mainImage}
                          fill
                          priority
                          sizes="(max-height: 160px) 100vw, 240px"
                        />
                      )}
                    </div>
                  </div>
                  <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col gap-1 items-start p-5 w-full">
                    <div className="flex items-end">
                      <p className="font-bold leading-[1.25] text-xl text-[var(--color-text-strong)] text-center whitespace-nowrap">
                        {prod.name}
                      </p>
                      {prod.isNew && (
                        <div className="flex items-center justify-center px-2 py-1 rounded-[50px]">
                          <span className="text-xs font-semibold text-[var(--color-error-400)]">
                            NEW
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-normal leading-6 text-sm text-[var(--color-text-basic)] whitespace-nowrap">
                      {prod.description}
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex gap-2 items-center p-5 w-full">
                    {prod.tags.map((tag, idx) => (
                      <React.Fragment key={`${tag}-${idx}`}>
                        <p className="font-bold leading-[1.25] text-[13px] text-[var(--color-primary-600)] text-center whitespace-nowrap">
                          {tag}
                        </p>
                        {idx < prod.tags.length - 1 && (
                          <div className="h-3 relative w-0">
                            <div className="absolute inset-[0_-0.5px]">
                              <Image
                                alt=""
                                className="block max-w-none size-full"
                                src={separatorIcon}
                                width={1}
                                height={12}
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
                        href={`/products/${selectedCategory.slug}/${prod.slug}`}
                      >
                        자세히보기
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// 제품 상세 뷰 컴포넌트
function ProductDetailView({
  pathname,
  category,
  product,
}: {
  pathname: string;
  category: Category;
  product: Product;
}) {
  const [activeTab, setActiveTab] = React.useState('상세설명');

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          {/* Breadcrumb and Title */}
          <FadeIn delay={0.1} direction="left" className="w-full">
            <div className="border-b border-[var(--color-button-gray-outlined-border-default)] flex flex-col md:flex-row items-start md:items-end justify-between gap-2 pb-1 pt-0 px-0 w-full">
              <p className="font-semibold leading-normal text-xl md:text-2xl lg:text-[30px] text-[var(--color-text-strong)]">
                {product.name}
              </p>
              <p className="font-normal leading-6 text-xs md:text-sm lg:text-[13px] text-[var(--color-text-basic)]">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                {' > '}
                <Link href="/products" className="hover:underline">
                  제품소개
                </Link>
                {' > '}
                <Link
                  href={`/products/${category.slug}`}
                  className="hover:underline"
                >
                  {category.name}
                </Link>
                {' > '}
                <span className="font-semibold text-[var(--color-text-strong)]">
                  {product.name}
                </span>
              </p>
            </div>
          </FadeIn>
          <div className="h-3 w-full" />

          {/* Product Image and Info */}
          <FadeIn delay={0.2} duration={0.8} className="w-full">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[360px] items-start w-full">
              <div className="flex flex-col grow h-[360px] items-center overflow-clip p-10 w-full lg:w-auto">
                {/* <div className="aspect-[310/392] grow relative"> */}
                <div className="w-full h-full relative">
                  <Image
                    alt=""
                    // className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                    fill
                    src={product.mainImage ?? ''}
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col grow h-full items-start pb-0 pt-10 px-0 w-full lg:w-auto">
                <div className="flex flex-col gap-1 items-start p-5 w-full">
                  <div className="flex gap-1 items-end">
                    <p className="font-semibold leading-[1.25] text-2xl text-[var(--color-text-strong)] whitespace-nowrap">
                      {product.name}
                    </p>
                    {product.isNew && (
                      <div className="flex items-center justify-center px-2 py-1 rounded-[50px]">
                        <span className="text-xs font-semibold text-[var(--color-error-400)]">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-normal leading-6 text-sm text-[var(--color-text-strong)] whitespace-nowrap">
                    {product.description}
                  </p>
                </div>
                {product.detailDescriptionKo &&
                  product.detailDescriptionKo.length > 0 && (
                    <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-start p-5 w-full">
                      <div className="font-normal leading-6 text-sm text-[var(--color-text-basic)] w-full">
                        {product.detailDescriptionKo.map((line, idx) => (
                          <p
                            key={idx}
                            className={
                              idx < product.detailDescriptionKo!.length - 1
                                ? 'mb-0'
                                : ''
                            }
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-wrap gap-2 items-center p-5 w-full">
                  {product.tags.map((tag, idx) => (
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
                              width={1}
                              height={12}
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="h-9 w-full" />

          {/* Tabs */}
          <FadeIn delay={0.4} duration={0.8} className="w-full">
            <CustomTabs
              value={activeTab}
              onValueChange={setActiveTab}
              variant="horizontal"
              className="w-full"
            >
              <CustomTabsList variant="horizontal" className="gap-2 w-full">
                <CustomTabsTrigger
                  value="상세설명"
                  variant="horizontal"
                  className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
                >
                  상세설명
                </CustomTabsTrigger>
                {product.video?.enabled && (
                  <CustomTabsTrigger
                    value="동영상자료"
                    variant="horizontal"
                    className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
                  >
                    동영상자료
                  </CustomTabsTrigger>
                )}
                {product.downloads?.enabled && (
                  <CustomTabsTrigger
                    value="다운로드"
                    variant="horizontal"
                    className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
                  >
                    다운로드
                  </CustomTabsTrigger>
                )}
              </CustomTabsList>

              {/* Description Tab Content */}
              <CustomTabsContent value="상세설명" className="mt-3">
                <div className="h-3 w-full" />
                <div className="bg-[var(--color-grey-50)] flex flex-col gap-5 items-start p-4 md:p-5 w-full">
                  <div className="font-normal leading-0 text-[var(--color-text-strong)] w-full">
                    {product.detailDescriptionEn && (
                      <>
                        <p className="font-bold leading-6 mb-0 text-[15px]">
                          Description
                        </p>
                        <p className="leading-6 mb-0 text-[15px]">
                          {product.detailDescriptionEn}
                        </p>
                        <p className="leading-6 mb-0 text-[15px]">&nbsp;</p>
                      </>
                    )}
                    {product.features && product.features.length > 0 && (
                      <>
                        <p className="font-bold leading-6 mb-0 text-[var(--color-text-strong)] text-[15px]">
                          Features
                        </p>
                        <ul className="list-disc pl-5">
                          {product.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className={`${
                                idx < product.features!.length - 1 ? 'mb-0' : ''
                              } ms-[calc(var(--list-marker-font-size,0)*1.5*1)]`}
                            >
                              <span className="leading-6 text-[15px]">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  {product.models && product.models.length > 0 ? (
                    <Carousel
                      opts={{
                        align: 'start',
                        loop: true,
                        // slidesToScroll: 1,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {product.models.map((model, idx) =>
                          model.image ? (
                            <CarouselItem key={idx} className="lg:basis-[40%]">
                              <div className="flex flex-col items-center gap-3">
                                <div className="relative h-[200px] md:h-[300px] lg:h-[400px] w-full bg-gray-300">
                                  <Image
                                    src={model.image}
                                    alt={model.name}
                                    fill
                                    // sizes="(max-height: 400px) 100vw"
                                    className="object-fit"
                                  />
                                </div>
                                <p className="font-medium text-sm md:text-base text-[var(--color-text-strong)]">
                                  {model.name}
                                </p>
                              </div>
                            </CarouselItem>
                          ) : null,
                        )}
                      </CarouselContent>
                      {product.models.filter((m) => m.image).length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    // <div className="bg-[var(--color-grey-300)] flex h-[200px] md:h-[300px] lg:h-[400px] items-center justify-center rounded-lg w-full">
                    //   <p className="font-semibold leading-[1.25] text-lg md:text-xl lg:text-2xl text-[var(--color-text-strong)] whitespace-nowrap">
                    //     이미지 영역
                    //   </p>
                    // </div>
                    <></>
                  )}
                </div>

                <div className="h-12 w-full" />

                {/* Model Selection */}
                {/* <div className="flex flex-col items-center w-full">
                  <div className="flex gap-1 items-start w-full">
                    <ChipGroup
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                      size="large"
                    >
                      {product.models?.map((model, idx) => (
                        <ChipGroupItem
                          key={`${model.name}-${idx}`}
                          value={model.name}
                        >
                          {model.name}
                        </ChipGroupItem>
                      ))}
                    </ChipGroup>
                  </div>
                  <div className="h-3 w-full" /> */}

                {/* Specifications Table */}
                {/* <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border-t border-(--color-grey-900)">
                      <tbody>
                        {specifications.map((spec, idx) => (
                          <React.Fragment key={idx}>
                            {Array.isArray(spec.value) ? (
                              spec.value.map((val, valIdx) => (
                                <tr key={`${idx}-${valIdx}`}>
                                  {valIdx === 0 && (
                                    <th
                                      rowSpan={spec.value.length}
                                      className="bg-(--color-grey-50) border-b border-r border-(--color-grey-350) px-5 py-4 text-left align-top w-50 min-w-50"
                                    >
                                      <span className="font-semibold text-base text-(--color-text-strong)">
                                        {spec.label}
                                      </span>
                                    </th>
                                  )}
                                  <td className="border-b border-(--color-grey-350) px-5 py-4">
                                    <span className="font-normal text-base text-(--color-text-strong)">
                                      {val}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <th className="bg-(--color-grey-50) border-b border-r border-(--color-grey-350) px-5 py-4 text-left w-50 min-w-50">
                                  <span className="font-semibold text-base text-(--color-text-strong)">
                                    {spec.label}
                                  </span>
                                </th>
                                <td className="border-b border-(--color-grey-350) px-5 py-4">
                                  <span className="font-normal text-base text-(--color-text-strong)">
                                    {spec.value}
                                  </span>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> */}
              </CustomTabsContent>

              {/* Video Tab Content */}
              {product.video?.enabled && (
                <CustomTabsContent value="동영상자료" className="mt-3">
                  <div className="h-3 w-full" />
                  <div className="bg-[var(--color-grey-50)] flex flex-col gap-5 items-start p-4 md:p-5 w-full">
                    {product.video.youtubeUrl ? (
                      <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(product.video.youtubeUrl)}
                          title={`${product.name} 동영상`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-[var(--color-grey-300)] flex items-center justify-center rounded-lg w-full">
                        <p className="font-semibold leading-[1.25] text-lg md:text-xl lg:text-2xl text-[var(--color-text-strong)]">
                          동영상 준비중
                        </p>
                      </div>
                    )}
                    {product.detailDescriptionEn && (
                      <div className="font-normal leading-6 text-[15px] text-[var(--color-text-strong)] w-full">
                        <p className="font-bold mb-0">Description</p>
                        <p>{product.detailDescriptionEn}</p>
                      </div>
                    )}
                  </div>
                </CustomTabsContent>
              )}

              {/* Download Tab Content */}
              {product.downloads?.enabled && (
                <CustomTabsContent value="다운로드" className="mt-3">
                  <div className="h-3 w-full" />
                  <div className="flex flex-wrap gap-4 md:gap-5 items-start w-full">
                    {product.downloads.items?.map((item, idx) => (
                      <DownloadCard key={idx} item={item} />
                    ))}
                  </div>
                </CustomTabsContent>
              )}
            </CustomTabs>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// 다운로드 카드 컴포넌트
function DownloadCard({ item }: { item: DownloadItem }) {
  const [selectedModel, setSelectedModel] = React.useState<
    DownloadModel | undefined
  >(undefined);
  const typeStyle = getFileTypeStyle(item.type);

  const handleModelSelect = (modelName: string) => {
    const model = item.models.find((m) => m.name === modelName);
    setSelectedModel(model);
  };

  const handleDownload = () => {
    if (!selectedModel) return;
    const link = document.createElement('a');
    link.href = selectedModel.fileUrl || `/downloads/${selectedModel.fileName}`;
    link.download = selectedModel.fileName;
    link.click();
  };

  const handlePreview = () => {
    if (!selectedModel || !isPreviewable(selectedModel.fileName)) return;
    window.open(
      selectedModel.fileUrl || `/downloads/${selectedModel.fileName}`,
      '_blank',
    );
  };

  return (
    <div className="bg-white border border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-center relative rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]">
      <div className="flex flex-col gap-1 items-start p-4 md:p-5 w-full">
        <p className="font-medium leading-6 text-xs md:text-[13px] text-[var(--color-text-basic)] whitespace-nowrap">
          {item.category}
        </p>
        <div className="flex gap-2 items-end px-0 py-1 flex-wrap">
          <div
            className={`border flex items-center justify-center px-1 py-0.5 rounded-sm ${typeStyle.bg} ${typeStyle.border}`}
          >
            <p
              className={`font-medium leading-[1.25] text-xs text-center whitespace-nowrap ${typeStyle.text}`}
            >
              {item.type}
            </p>
          </div>
          <p className="font-medium leading-none text-base md:text-lg text-[var(--color-text-strong)] text-center break-words md:whitespace-nowrap">
            {item.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-stretch justify-center pb-4 md:pb-5 pt-0 px-4 md:px-5 w-full">
        <CustomDropdown
          value={selectedModel?.name}
          onValueChange={handleModelSelect}
        >
          <CustomDropdownTrigger className="grow min-w-0 w-full">
            <CustomDropdownValue placeholder="모델을 선택하세요" />
          </CustomDropdownTrigger>
          <CustomDropdownContent>
            {item.models.map((model, optIdx) => (
              <CustomDropdownItem key={optIdx} value={model.name}>
                {model.name}
              </CustomDropdownItem>
            ))}
          </CustomDropdownContent>
        </CustomDropdown>
        <div className="flex gap-2">
          {isPreviewable(selectedModel?.fileName ?? '') && (
            <Button
              variant="outline"
              className="min-h-9 px-3 py-2 rounded-md text-sm font-bold flex-1"
              onClick={handlePreview}
              disabled={!selectedModel}
            >
              미리보기
            </Button>
          )}
          <Button
            variant="default"
            className="bg-[var(--color-grey-850)] text-white min-h-9 px-3 py-2 rounded-md text-sm font-bold flex-1"
            onClick={handleDownload}
            disabled={!selectedModel}
          >
            다운로드
          </Button>
        </div>
      </div>
    </div>
  );
}
