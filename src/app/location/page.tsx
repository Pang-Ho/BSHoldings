'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function LocationPage() {
  const pathname = usePathname();
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Kakao Map initialization
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'YOUR_KAKAO_MAP_API_KEY'}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (mapRef.current) {
            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(37.3175, 126.8308), // 안산시 단원구 원포공원 1로 59
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            // Marker
            const markerPosition = new window.kakao.maps.LatLng(37.3175, 126.8308);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);

            // Info Window
            const iwContent = `
              <div style="padding:10px;min-width:200px;">
                <strong>BS Holdings</strong><br>
                경기도 안산시 단원구 원포공원 1로 59 B동 201호
              </div>
            `;
            const iwPosition = new window.kakao.maps.LatLng(37.3175, 126.8308);
            const infowindow = new window.kakao.maps.InfoWindow({
              position: iwPosition,
              content: iwContent,
            });
            infowindow.open(map, marker);
          }
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />
      
      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          <div className="flex items-center">
            <p className="font-semibold leading-6 text-2xl md:text-3xl lg:text-[36px] text-[var(--color-text-strong)] whitespace-nowrap">
              오시는길
            </p>
          </div>
          <div className="h-6 md:h-8 lg:h-10 w-full" />
          <div className="flex flex-col gap-4 md:gap-5 items-start w-full">
            <div className="font-semibold leading-[1.4] text-lg md:text-xl lg:text-[26px] text-[var(--color-grey-850)]">
              <p className="mb-0">경기도 안산시 단원구 원포공원 1로 59</p>
              <p>B동 201호</p>
            </div>
            <div className="w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-lg overflow-hidden border border-[var(--color-grey-300)]">
              <div ref={mapRef} className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-semibold text-lg text-[var(--color-text-strong)] mb-2">
                  대중교통 이용 시
                </p>
                <p className="font-normal text-base text-[var(--color-text-basic)]">
                  지하철 4호선 안산역 하차 후 버스 이용
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg text-[var(--color-text-strong)] mb-2">
                  자가용 이용 시
                </p>
                <p className="font-normal text-base text-[var(--color-text-basic)]">
                  경인고속도로 안산IC 하차 후 약 10분 소요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Extend Window interface for Kakao Maps
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: { center: any; level: number }) => any;
        LatLng: new (lat: number, lng: number) => any;
        Marker: new (options: { position: any }) => any;
        InfoWindow: new (options: { position: any; content: string }) => any;
      };
    };
  }
}
