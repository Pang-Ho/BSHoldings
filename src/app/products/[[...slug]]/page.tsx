import { Metadata } from 'next';

import productsData from '@/lib/data/products.json';
import ProductsPageClient from './ProductsPageClient';

// 타입 정의
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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
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

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const categorySlug = slug[0];
  const productSlug = slug[1];

  const baseUrl = 'https://bestsensor.kr';

  // 제품 상세 페이지
  if (categorySlug && productSlug) {
    const category = findCategory(categorySlug);
    const product = category ? findProduct(category, productSlug) : null;

    if (product && category) {
      const title = `${product.name} | ${category.name}`;
      const description =
        product.detailDescriptionKo?.join(' ').substring(0, 160) ||
        product.description;
      const keywords = [product.name, ...product.tags, category.name];

      return {
        title,
        description,
        keywords,
        openGraph: {
          title,
          description,
          url: `${baseUrl}/products/${categorySlug}/${productSlug}`,
          type: 'website',
          images: product.mainImage
            ? [
                {
                  url: product.mainImage,
                  width: 800,
                  height: 600,
                  alt: product.name,
                },
              ]
            : [],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: product.mainImage ? [product.mainImage] : [],
        },
      };
    }
  }

  // 카테고리 페이지
  if (categorySlug) {
    const category = findCategory(categorySlug);

    if (category) {
      const title = `${category.name} | 제품소개`;
      const productNames = category.products.map((p) => p.name).join(', ');
      const description = `BS홀딩스의 ${category.name} 제품을 만나보세요. ${productNames.substring(0, 100)}`;

      // 카테고리의 모든 제품 태그 수집
      const allTags = Array.from(
        new Set(category.products.flatMap((p) => p.tags)),
      );

      return {
        title,
        description,
        keywords: [category.name, ...allTags],
        openGraph: {
          title,
          description,
          url: `${baseUrl}/products/${categorySlug}`,
          type: 'website',
        },
        twitter: {
          card: 'summary',
          title,
          description,
        },
      };
    }
  }

  // 제품 목록 페이지 (기본)
  return {
    title: '제품소개',
    description:
      'BS홀딩스의 다양한 산업용 센서 제품을 만나보세요. 근접센서, 광전센서, 정전용량센서 등 다양한 센서 솔루션을 제공합니다.',
    keywords: [
      '산업용센서',
      '근접센서',
      '광전센서',
      '정전용량센서',
      '초음파센서',
      '레벨센서',
    ],
    openGraph: {
      title: '제품소개 | BS홀딩스',
      description:
        'BS홀딩스의 다양한 산업용 센서 제품을 만나보세요. 근접센서, 광전센서, 정전용량센서 등 다양한 센서 솔루션을 제공합니다.',
      url: `${baseUrl}/products`,
      type: 'website',
    },
  };
}

// 정적 파라미터 생성 (선택사항, 빌드 시 정적 페이지 생성)
export async function generateStaticParams() {
  const categories = productsData as Category[];

  // 모든 카테고리와 제품 조합 생성
  const params: { slug: string[] }[] = [];

  // /products 경로 추가 (빈 slug)
  params.push({ slug: [] });

  // 카테고리 페이지들
  categories.forEach((category) => {
    params.push({ slug: [category.slug] });

    // 각 카테고리의 제품 페이지들
    category.products.forEach((product) => {
      params.push({ slug: [category.slug, product.slug] });
    });
  });

  return params;
}

export default async function ProductsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  return <ProductsPageClient slug={slug} />;
}
