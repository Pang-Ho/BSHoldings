import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test-mega-menu'],
      },
    ],
    sitemap: 'http://bestsens.co.kr/sitemap.xml',
  };
}
