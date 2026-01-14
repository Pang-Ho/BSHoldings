'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function CompanyPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />
      
      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col gap-6 md:gap-8 lg:gap-10 items-start px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
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
          <div className="bg-[var(--color-grey-50)] flex flex-col gap-3 items-center justify-center pb-12 md:pb-20 lg:pb-[140px] pt-12 md:pt-20 lg:pt-[120px] px-4 md:px-10 lg:px-20 w-full max-w-[900px]">
            <div className="font-semibold leading-[1.5] text-[var(--color-text-strong)] text-center tracking-[-0.36px]">
              <p className="font-medium mb-0 text-[#647180] text-[24px]">
                자동화 제품과 자동화 설비 컨설팅 그리고 센서제작에 이르는
              </p>
              <p className="font-bold text-[36px]">고객 맞춤형 서비스</p>
            </div>
            <div className="flex items-start justify-center pb-6 md:pb-10 pt-12 md:pt-20 lg:pt-[100px] px-0 w-full max-w-[700px]">
              <div
                className="flex flex-col items-center justify-center relative rounded-full shadow-lg w-full max-w-[480px] aspect-square"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--color-primary-100) 13.229%, var(--color-secondary-50) 100%)',
                }}
              >
                <div className="absolute bg-white flex items-center justify-center left-1/2 rounded-[75px] shadow-md size-[150px] top-[calc(50%-240px)] -translate-x-1/2 -translate-y-1/2">
                  <div className="font-bold leading-[1.25] text-2xl text-[var(--color-text-strong)] text-center">
                    <p className="mb-0">자동화</p>
                    <p>제품 판매</p>
                  </div>
                </div>
                <div className="absolute bg-white flex items-center justify-center left-[calc(50%+214px)] rounded-[75px] shadow-md size-[150px] top-[calc(50%+105px)] -translate-x-1/2 -translate-y-1/2">
                  <div className="font-bold leading-[1.25] text-2xl text-[var(--color-text-strong)] text-center">
                    <p className="mb-0">자동화</p>
                    <p>센서제작</p>
                  </div>
                </div>
                <div className="font-semibold leading-[1.25] text-[36px] text-[var(--color-grey-850)] text-center tracking-[-0.36px]">
                  <p className="mb-0">Best Solution</p>
                  <p>Best Sensor</p>
                </div>
                <p className="font-normal leading-6 text-[15px] text-[var(--color-text-basic)] whitespace-nowrap">
                  Provide the Best solutions
                </p>
                <div className="absolute bg-white flex items-center justify-center left-[calc(50%-214px)] rounded-[75px] shadow-md size-[150px] top-[calc(50%+105px)] -translate-x-1/2 -translate-y-1/2">
                  <div className="font-bold leading-[1.25] text-2xl text-[var(--color-text-strong)] text-center">
                    <p className="mb-0">자동화</p>
                    <p>컨설팅</p>
                  </div>
                </div>
                <div className="absolute font-medium leading-6 left-[-74px] text-xl text-[var(--color-text-basic)] whitespace-nowrap top-[436px] tracking-[-0.4px]">
                  <p className="font-bold mb-0 text-[var(--color-text-strong)] tracking-[-0.32px]">
                    기계별 적합한 솔루션 상담
                  </p>
                  <p className="font-bold mb-0 text-[var(--color-text-strong)] tracking-[-0.32px]">
                    Vision Application 및 솔루션
                  </p>
                  <p>(카메라, 조명, S/W 등)</p>
                </div>
                <div className="absolute font-medium leading-6 left-[356px] text-xl text-[var(--color-text-basic)] whitespace-nowrap top-[436px] tracking-[-0.4px]">
                  <p className="mb-0">
                    <span className="font-bold text-[var(--color-text-strong)] tracking-[-0.4px]">
                      주문자 상표 공급 방식
                    </span>
                    <span className="font-bold"> </span>(OEM)
                  </p>
                  <p className="font-bold text-[var(--color-text-strong)]">주문자 요청 센서 제작</p>
                </div>
                <div className="absolute font-medium leading-6 left-[331px] text-xl text-[var(--color-text-basic)] whitespace-nowrap top-[-30px] tracking-[-0.4px]">
                  <p className="font-bold mb-0 text-[var(--color-text-strong)]">
                    글로벌 주요 5개국 센서
                  </p>
                  <p>유럽 · 북미 등 10여 개 제조사</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
