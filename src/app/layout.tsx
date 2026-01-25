import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2', // 폰트 파일 경로
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard', // CSS 변수 이름 정의
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bestsensor.kr'),
  title: {
    default: 'BS홀딩스 | 산업용 센서 전문 기업',
    template: '%s | BS홀딩스',
  },
  description:
    'BS홀딩스는 근접센서, 광전센서, 정전용량센서 등 다양한 산업용 센서와 자동화 솔루션을 제공하는 전문 기업입니다. 최상의 솔루션과 최적의 가격 경쟁력으로 고객의 자동화 과정을 함께합니다.',
  keywords: [
    '근접센서',
    '광전센서',
    '정전용량센서',
    '초음파센서',
    '내열센서',
    '레벨센서',
    '레이저센서',
    '엔코더',
    '안전센서',
    '산업용센서',
    'BS홀딩스',
    'BS Holdings',
    '센서제조',
    '자동화솔루션',
    'OEM센서',
  ],
  authors: [{ name: 'BS홀딩스' }],
  creator: 'BS홀딩스',
  publisher: 'BS홀딩스',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://bestsensor.kr',
    title: 'BS홀딩스 | 산업용 센서 전문 기업',
    description:
      '근접센서, 광전센서, 정전용량센서 등 산업용 센서와 자동화 솔루션 전문 기업',
    siteName: 'BS홀딩스',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'BS홀딩스 - 산업용 센서 전문 기업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BS홀딩스 | 산업용 센서 전문 기업',
    description:
      '근접센서, 광전센서, 정전용량센서 등 산업용 센서와 자동화 솔루션 전문 기업',
    images: ['/images/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '_fTI02knIcYUo1E8M29TwVluaOXYE3ULsg6dE5MvoQM',
    //google-site-verification=_fTI02knIcYUo1E8M29TwVluaOXYE3ULsg6dE5MvoQM
  },
  other: {
    'naver-site-verification': '92e8da485e9799658a4e1d9119c1be1c82b8e9f4',
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`font-pretendard antialiased`}>{children}</body>
    </html>
  );
}
