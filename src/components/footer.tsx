import Image from 'next/image';

import logoImage from '../../public/icons/logo_white.svg';
import separatorIcon from '../../public/icons/separatorIcon.svg';

export function Footer() {
  return (
    <footer className="bg-[#0a111a] flex flex-col items-center w-full">
      <div className="flex flex-col gap-4 md:gap-5 items-start px-4 md:px-6 py-12 md:py-16 lg:py-20 w-full max-w-[1200px]">
        <div className="h-6 md:h-7 lg:h-8 relative shrink-0 w-32 md:w-36 lg:w-40">
          <Image
            alt="BS Holdings Logo"
            className="absolute inset-0 max-w-none mix-blend-screen object-cover object-[50%_50%] pointer-events-none size-full"
            src={logoImage}
          />
        </div>
        <p className="font-bold leading-[1.25] text-sm md:text-[15px] text-white text-center whitespace-nowrap">
          비에스홀딩스
        </p>
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center flex-wrap">
            <p className="font-normal leading-6 text-xs md:text-sm text-white whitespace-nowrap">
              대표번호 : 031-411-5011
            </p>
            <div className="hidden md:block h-3 relative shrink-0 w-0">
              <div className="absolute inset-[0_-0.5px]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={separatorIcon}
                />
              </div>
            </div>
            <p className="font-normal leading-6 text-xs md:text-sm text-[var(--color-grey-400)] break-words md:whitespace-nowrap">
              주소 : 경기도 안산시 단원구 원포공원 1로 59 B동 201호
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center flex-wrap">
            <p className="font-normal leading-6 text-xs md:text-sm text-[var(--color-grey-400)] whitespace-nowrap">
              대표이사 : 이효종
            </p>
            <div className="hidden md:block h-3 relative shrink-0 w-0">
              <div className="absolute inset-[0_-0.5px]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={separatorIcon}
                />
              </div>
            </div>
            <p className="font-normal leading-6 text-xs md:text-sm text-[var(--color-grey-400)] whitespace-nowrap">
              이메일 : bsh5011@hanmail.net
            </p>
            <div className="hidden md:block h-3 relative shrink-0 w-0">
              <div className="absolute inset-[0_-0.5px]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={separatorIcon}
                />
              </div>
            </div>
            <p className="font-normal leading-6 text-xs md:text-sm text-[var(--color-grey-400)] break-words md:whitespace-nowrap">
              Copyright © 2025 BS Holdings All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
