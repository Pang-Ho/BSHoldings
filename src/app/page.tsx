import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { OrganizationStructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'BS홀딩스 | 산업용 센서 전문 기업',
  description:
    'BS홀딩스는 근접센서, 광전센서, 정전용량센서 등 다양한 산업용 센서와 자동화 솔루션을 제공하는 전문 기업입니다. 시작부터 완성까지 모든 자동화 과정에 함께합니다.',
  keywords: [
    '근접센서',
    '광전센서',
    '정전용량센서',
    '초음파센서',
    '내열센서',
    '레벨센서',
    '레이저센서',
    '산업용센서',
    'BS홀딩스',
    '자동화솔루션',
    '센서제조',
    'OEM센서',
  ],
  openGraph: {
    title: 'BS홀딩스 | 산업용 센서 전문 기업',
    description:
      '시작부터 완성까지 모든 자동화 과정에 함께하는 파트너. 근접센서, 광전센서 등 산업용 센서 전문 기업 BS홀딩스',
    url: 'http://bestsens.co.kr',
    type: 'website',
  },
};

export default function HomePage() {
  const baseUrl = 'http://bestsens.co.kr';

  return (
    <>
      {/* 구조화된 데이터 - 회사 정보 */}
      <OrganizationStructuredData
        name="BS홀딩스"
        url={baseUrl}
        logo={`${baseUrl}/images/logo.png`}
        description="근접센서, 광전센서, 정전용량센서 등 산업용 센서와 자동화 솔루션을 제공하는 전문 기업"
        address={{
          streetAddress: '원포공원 1로 59, B동 201호',
          addressLocality: '안산시 단원구',
          addressRegion: '경기도',
          postalCode: '15656',
          addressCountry: 'KR',
        }}
        contactPoint={{
          telephone: '+82-31-411-5011',
          contactType: 'customer service',
          email: 'bsh5011@hanmail.net',
        }}
      />
      <HomePageClient />
    </>
  );
}
