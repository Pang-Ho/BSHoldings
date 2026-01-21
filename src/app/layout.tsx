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
  title: 'BS Holdings',
  description: 'BS Holdings 공식 웹사이트',
  other: {
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
