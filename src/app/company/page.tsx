import { Metadata } from 'next';
import CompanyPageClient from './CompanyPageClient';

export const metadata: Metadata = {
  title: '회사소개',
  description:
    'BS홀딩스는 산업현장에 필요한 자동화 제품과 레이저 제품으로 현장의 어려움 해소에 앞장서고 있습니다. 근접센서, 광전센서 등 다양한 산업용 센서 솔루션을 제공합니다.',
  keywords: [
    'BS홀딩스',
    '회사소개',
    '산업용센서',
    '자동화제품',
    '레이저제품',
    '센서제조업체',
  ],
  openGraph: {
    title: '회사소개 | BS홀딩스',
    description:
      '산업현장에 필요한 자동화 제품과 레이저 제품으로 현장의 어려움 해소에 앞장서는 BS홀딩스',
    url: 'http://bestsens.co.kr/company',
    type: 'website',
  },
};

export default function CompanyPage() {
  return <CompanyPageClient />;
}
