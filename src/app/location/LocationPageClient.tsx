'use client';

import { Mail, Phone, Printer } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { FadeIn } from '@/components/animations';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const mapHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <style>
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
      .root_daum_roughmap { width: 100% !important; height: 100% !important; }
      /* ... 기존 스타일 생략 ... */
    </style>
  </head>
  <body>
    <div id="daumRoughmapContainer1768400232152" class="root_daum_roughmap root_daum_roughmap_landing" style="width:100%; height:100%;"></div>
    
    <script charset="UTF-8" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
    
    <script charset="UTF-8">
      // 스크립트가 로드되었는지 확인 후 실행하는 것이 안전합니다.
      window.onload = function() {
        if (window.daum && daum.roughmap && daum.roughmap.Lander) {
          new daum.roughmap.Lander({
            "timestamp" : "1768400232152",
            "key" : "fmvjmvtb5ad",
            "mapWidth" : "100%",
            "mapHeight" : "480"
          }).render();
        }
      };
    </script>
  </body>
</html>
`;

export default function LocationPageClient() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />

      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          <FadeIn delay={0.1} direction="left">
            <div className="flex items-center">
              <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
                오시는길
              </p>
            </div>
          </FadeIn>
          <div className="h-6 md:h-8 lg:h-10 w-full" />

          {/* 카카오맵 퍼가기 */}
          <FadeIn delay={0.2} duration={0.8} className="w-full">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden border border-[var(--color-grey-300)]">
              <iframe
                srcDoc={mapHtml}
                className="w-full h-full border-none"
                title="카카오맵"
              />
            </div>
          </FadeIn>

          {/* 회사 정보 카드 */}
          <FadeIn delay={0.4} duration={0.8} className="w-full">
            <div className="w-full bg-white border-x border-b border-[var(--color-grey-300)]">
              {/* 주소 정보 */}
              <div className="px-4 md:px-6 py-6 md:py-8">
                <p className="text-[var(--color-primary-600)] font-medium text-base mb-2">
                  비에스홀딩스
                </p>
                <p className="font-bold text-xl md:text-2xl text-[var(--color-text-strong)] mb-2">
                  경기도 안산시 단원구 원포공원 1로 59, B동 201호
                </p>
                <p className="text-[var(--color-text-basic)] text-sm">
                  (지번) 원시동 741-3 (우) 15656
                </p>
              </div>

              {/* 연락처 정보 */}
              <div className="border-t border-[var(--color-grey-200)]">
                {/* TEL */}
                <div className="flex items-center gap-4 px-4 md:px-6 py-4 border-b border-[var(--color-grey-200)]">
                  <Phone className="w-5 h-5 text-[var(--color-grey-500)]" />
                  <span className="font-semibold text-[var(--color-text-strong)] w-16">
                    TEL
                  </span>
                  <span className="text-[var(--color-text-strong)]">
                    031-411-5011
                  </span>
                </div>

                {/* FAX */}
                <div className="flex items-center gap-4 px-4 md:px-6 py-4 border-b border-[var(--color-grey-200)]">
                  <Printer className="w-5 h-5 text-[var(--color-grey-500)]" />
                  <span className="font-semibold text-[var(--color-text-strong)] w-16">
                    FAX
                  </span>
                  <span className="text-[var(--color-text-strong)]">
                    031-411-5012
                  </span>
                </div>

                {/* E-mail */}
                <div className="flex items-center gap-4 px-4 md:px-6 py-4">
                  <Mail className="w-5 h-5 text-[var(--color-grey-500)]" />
                  <span className="font-semibold text-[var(--color-text-strong)] w-16">
                    E-mail
                  </span>
                  <span className="text-[var(--color-text-strong)]">
                    bsh5011@hanmail.net
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  );
}
