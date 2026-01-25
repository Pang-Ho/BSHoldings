import productsData from '@/lib/data/products.json';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
interface Product {
  id: string;
  slug: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

const categories = productsData as Category[];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://bestsens.co.kr';

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 카테고리 페이지들
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 제품 상세 페이지들
  const productPages: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.products.map((product) => ({
      url: `${baseUrl}/products/${category.slug}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...categoryPages, ...productPages];
}
