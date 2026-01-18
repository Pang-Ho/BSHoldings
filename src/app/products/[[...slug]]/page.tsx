'use client';

import Link from 'next/link';
import { notFound, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ChipGroup, ChipGroupItem } from '@/components/ui/chip';
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
import productImage from '../../../../public/images/productImage.jpg';

import productsData from '@/lib/data/products.json';

// 타입 정의
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  isNew: boolean;
  detailDescriptionKo?: string[];
  detailDescriptionEn?: string;
  features?: string[];
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

// 데이터 찾기 헬퍼 함수들
function findCategory(categorySlug: string): Category | undefined {
  return (productsData as Category[]).find((cat) => cat.slug === categorySlug);
}

function findSubCategory(
  category: Category,
  subCategorySlug: string,
): SubCategory | undefined {
  return category.subCategories.find((sub) => sub.slug === subCategorySlug);
}

function findProduct(
  subCategory: SubCategory,
  productSlug: string,
): Product | undefined {
  return subCategory.products.find((prod) => prod.slug === productSlug);
}

// 모든 제품 가져오기 (1레벨만 선택했을 때)
function getAllProductsInCategory(category: Category): Product[] {
  return category.subCategories.flatMap((sub) => sub.products);
}

// 제품 상세 정보 (임시 데이터)
const productTags = [
  '손가락감지',
  '라이트커튼',
  '세이프티',
  '세이프티',
  '세이프티',
];

const modelNames = ['Model Name1', 'Model Name2', 'Model Name3'];

const specifications = [
  { label: 'Supply voltage', value: '10..30VDC' },
  { label: 'Light source', value: 'Red LED (625nm) / Laser light, Class 1' },
  { label: 'Switching output', value: 'PNP / NPN' },
  {
    label: 'Switching mode',
    value: [
      'Light on: white wire to U+ / suspended',
      'Dark on: white wire to U-',
    ],
  },
  { label: 'No-load supply current', value: '≤20mA' },
  { label: 'Load supply current', value: '≤100mA' },
  { label: 'Sensitivity', value: 'Potentiometer adjustment' },
  { label: 'LED', value: 'Power (green), output state (yellow)' },
  { label: 'Housing material', value: 'Polycarbonate' },
  { label: 'Lens material', value: 'PMMA' },
  { label: 'Connection', value: 'M8 connector / 2 m cable' },
  { label: 'Ambient operation temperature', value: '-25。 C..+55。 C' },
  { label: 'Ambient storage temperature', value: '-40。 C..+70。 C' },
  { label: 'Protection class', value: 'IP67' },
];

const downloadItems = [
  {
    category: '매뉴얼',
    type: 'PDF',
    name: 'SLC Series',
    options: ['옵션아이템1', '옵션아이템2', '옵션아이템3'],
  },
  {
    category: 'CAD',
    type: 'DWG',
    name: '2D CAD (SLC Series)',
    options: ['옵션아이템1', '옵션아이템2', '옵션아이템3'],
  },
  {
    category: 'CAD',
    type: 'STEP',
    name: '3D CAD (SLC Series)',
    options: ['옵션아이템1', '옵션아이템2', '옵션아이템3'],
  },
  {
    category: '인증서 > 국내인증',
    type: 'PDF',
    name: 'SLC Series',
    options: ['옵션아이템1', '옵션아이템2', '옵션아이템3'],
  },
];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function ProductsPage({ params }: PageProps) {
  const pathname = usePathname();
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug || [];

  // URL 파싱
  const categorySlug = slug[0];
  const subCategorySlug = slug[1];
  const productSlug = slug[2];

  // 데이터 찾기
  const category = categorySlug ? findCategory(categorySlug) : null;
  const subCategory =
    category && subCategorySlug
      ? findSubCategory(category, subCategorySlug)
      : null;
  const product =
    subCategory && productSlug ? findProduct(subCategory, productSlug) : null;

  // 유효하지 않은 경로 체크
  if (categorySlug && !category) {
    notFound();
  }
  if (subCategorySlug && !subCategory) {
    notFound();
  }
  if (productSlug && !product) {
    notFound();
  }

  // 3레벨 (제품 상세)
  if (product && subCategory && category) {
    return (
      <ProductDetailView
        pathname={pathname}
        category={category}
        subCategory={subCategory}
        product={product}
      />
    );
  }

  // 1레벨 또는 2레벨 (리스트 뷰)
  return (
    <ProductListView
      pathname={pathname}
      category={category ?? null}
      subCategory={subCategory ?? null}
    />
  );
}

// 제품 리스트 뷰 컴포넌트
function ProductListView({
  pathname,
  category,
  subCategory,
}: {
  pathname: string;
  category: Category | null;
  subCategory: SubCategory | null;
}) {
  const router = useRouter();
  const categories = productsData as Category[];

  // 선택된 카테고리 (기본값: 첫 번째 카테고리)
  const selectedCategory = category || categories[0];
  const selectedSubCategory = subCategory || null;

  // 표시할 제품들
  const displayProducts = selectedSubCategory
    ? selectedSubCategory.products
    : getAllProductsInCategory(selectedCategory);

  // 페이지 타이틀
  const pageTitle = selectedSubCategory
    ? selectedSubCategory.name
    : selectedCategory.name;

  console.log(
    selectedSubCategory?.slug,
    selectedCategory.subCategories,
    selectedCategory.subCategories.find(
      (sub) => sub.slug === selectedSubCategory?.slug,
    )?.slug,
  );
  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1248px]">
          <p className="font-semibold leading-normal text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
            {pageTitle}
          </p>
          <div className="h-3 w-full" />

          {/* 1레벨 탭 */}
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

          <div className="h-4 md:h-12 w-full" />

          {/* 2레벨 칩 */}
          <div className="flex gap-1 md:gap-2 items-start w-full flex-nowrap overflow-x-auto overflow-y-hidden h-9 md:h-12 items-start ">
            <ChipGroup
              value={selectedSubCategory?.slug || ''}
              onValueChange={(v) => {
                router.push(`/products/${selectedCategory.slug}/${v}`);
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

          <div className="h-5 w-full" />

          {/* 제품 그리드 */}
          <div className="flex flex-wrap gap-4 md:gap-6 items-start w-full justify-start">
            {displayProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white border-2 flex flex-col items-center overflow-clip relative rounded-2xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[282px] border-[var(--color-button-gray-outlined-border-default)] hover:border-[var(--color-Text-Strong)] transition-colors duration-200"
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
                      href={`/products/${selectedCategory.slug}/${
                        selectedSubCategory?.slug ||
                        selectedCategory.subCategories.find((sub) =>
                          sub.products.some((p) => p.slug === prod.slug),
                        )?.slug
                      }/${prod.slug}`}
                    >
                      자세히보기
                    </Link>
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

// 제품 상세 뷰 컴포넌트
function ProductDetailView({
  pathname,
  category,
  subCategory,
  product,
}: {
  pathname: string;
  category: Category;
  subCategory: SubCategory;
  product: Product;
}) {
  const [activeTab, setActiveTab] = React.useState('상세설명');
  const [selectedModel, setSelectedModel] = React.useState('Model Name1');

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          {/* Breadcrumb and Title */}
          <div className="border-b border-[var(--color-button-gray-outlined-border-default)] flex flex-col md:flex-row items-start md:items-end justify-between gap-2 pb-1 pt-0 px-0 w-full">
            <p className="font-semibold leading-6 text-xl md:text-2xl lg:text-[30px] text-[var(--color-text-strong)]">
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
              <Link
                href={`/products/${category.slug}/${subCategory.slug}`}
                className="hover:underline"
              >
                {subCategory.name}
              </Link>
              {' > '}
              <span className="font-semibold text-[var(--color-text-strong)]">
                {product.name}
              </span>
            </p>
          </div>
          <div className="h-3 w-full" />

          {/* Product Image and Info */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[360px] items-start w-full">
            <div className="flex flex-col grow h-[360px] items-center overflow-clip p-10 w-full lg:w-auto">
              <div className="aspect-[310/392] grow relative">
                <Image
                  alt=""
                  className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                  src={productImage}
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
                {productTags.map((tag, idx) => (
                  <React.Fragment key={`${tag}-${idx}`}>
                    <p className="font-bold leading-[1.25] text-[13px] text-[var(--color-primary-600)] text-center whitespace-nowrap">
                      {tag}
                    </p>
                    {idx < productTags.length - 1 && (
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

          <div className="h-9 w-full" />

          {/* Tabs */}
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
              <CustomTabsTrigger
                value="동영상자료"
                variant="horizontal"
                className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
              >
                동영상자료
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="다운로드"
                variant="horizontal"
                className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap"
              >
                다운로드
              </CustomTabsTrigger>
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
                <div className="bg-[var(--color-grey-300)] flex h-[200px] md:h-[300px] lg:h-[400px] items-center justify-center rounded-lg w-full">
                  <p className="font-semibold leading-[1.25] text-lg md:text-xl lg:text-2xl text-[var(--color-text-strong)] whitespace-nowrap">
                    이미지 영역
                  </p>
                </div>
              </div>

              <div className="h-12 w-full" />

              {/* Model Selection */}
              <div className="flex flex-col items-center w-full">
                <div className="flex gap-1 items-start w-full">
                  <ChipGroup
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    size="large"
                  >
                    {modelNames.map((name, idx) => (
                      <ChipGroupItem key={`${name}-${idx}`} value={name}>
                        {name}
                      </ChipGroupItem>
                    ))}
                  </ChipGroup>
                </div>
                <div className="h-3 w-full" />

                {/* Specifications Table */}
                <div className="w-full overflow-x-auto">
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
              </div>
            </CustomTabsContent>

            {/* Video Tab Content */}
            <CustomTabsContent value="동영상자료" className="mt-3">
              <div className="h-3 w-full" />
              <div className="bg-[var(--color-grey-50)] flex flex-col gap-5 items-start p-4 md:p-5 w-full">
                <div className="aspect-video bg-[var(--color-grey-300)] flex items-center justify-center rounded-lg w-full">
                  <p className="font-semibold leading-[1.25] text-lg md:text-xl lg:text-2xl text-[var(--color-text-strong)]">
                    비디오 영역
                  </p>
                </div>
                {product.detailDescriptionEn && (
                  <div className="font-normal leading-6 text-[15px] text-[var(--color-text-strong)] w-full">
                    <p className="font-bold mb-0">Description</p>
                    <p>{product.detailDescriptionEn}</p>
                  </div>
                )}
              </div>
            </CustomTabsContent>

            {/* Download Tab Content */}
            <CustomTabsContent value="다운로드" className="mt-3">
              <div className="h-3 w-full" />
              <div className="flex flex-wrap gap-4 md:gap-5 items-start w-full">
                {downloadItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-center relative rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]"
                  >
                    <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col gap-1 items-start p-4 md:p-5 w-full">
                      <p className="font-medium leading-6 text-xs md:text-[13px] text-[var(--color-text-basic)] whitespace-nowrap">
                        {item.category}
                      </p>
                      <div className="flex gap-2 items-end px-0 py-1 flex-wrap">
                        <div
                          className={`border flex items-center justify-center px-1 py-0.5 rounded-sm ${
                            item.type === 'PDF'
                              ? 'bg-[var(--color-error-100)] border-[var(--color-error-300)]'
                              : 'bg-[var(--color-success-100)] border-[var(--color-success-300)]'
                          }`}
                        >
                          <p
                            className={`font-medium leading-[1.25] text-xs text-center whitespace-nowrap ${
                              item.type === 'PDF'
                                ? 'text-[var(--color-error-600)]'
                                : 'text-[var(--color-success-600)]'
                            }`}
                          >
                            {item.type}
                          </p>
                        </div>
                        <p className="font-medium leading-none text-base md:text-lg text-[var(--color-text-strong)] text-center break-words md:whitespace-nowrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col flex-row gap-2 gap-1.5 items-stretch items-start justify-center pb-4 md:pb-5 pt-0 px-4 md:px-5 w-full">
                      <CustomDropdown>
                        <CustomDropdownTrigger className="grow min-w-0">
                          <CustomDropdownValue placeholder="모델을 선택하세요" />
                        </CustomDropdownTrigger>
                        <CustomDropdownContent>
                          {item.options.map((option, optIdx) => (
                            <CustomDropdownItem key={optIdx} value={option}>
                              {option}
                            </CustomDropdownItem>
                          ))}
                        </CustomDropdownContent>
                      </CustomDropdown>
                      <Button
                        variant="default"
                        className="bg-[var(--color-grey-850)] text-white min-h-9 px-3 py-2 rounded-md text-xs text-sm font-bold gap-0.5 w-full w-auto"
                      >
                        <span>다운로드</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CustomTabsContent>
          </CustomTabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
