'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function CompanyPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col gap-6 md:gap-8 lg:gap-10 items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          <div className="flex items-center">
            <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
              회사 소개
            </p>
          </div>
          <div className="font-semibold leading-[1.4] min-w-full text-lg md:text-xl lg:text-[26px] text-[var(--color-grey-850)] w-[min-content]">
            <p className="mb-0">BS홀딩스는 산업현장에 필요한</p>
            <p className="mb-0">자동화 제품과 레이저 제품으로</p>
            <p>현장의 어려움 해소에 앞장서고 있습니다.</p>
          </div>
          <div className="w-full max-w-[900px] self-center">
            <Image
              src="/images/company.jpg"
              alt="BS홀딩스 회사 소개"
              width={900}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
