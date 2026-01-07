'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import * as React from 'react';

import { Chip, ChipGroup, ChipGroupItem } from '@/components/ui/chip';
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from '@/components/ui/custom-tabs';
import { CustomDropdown, CustomDropdownContent, CustomDropdownItem, CustomDropdownTrigger, CustomDropdownValue } from '@/components/ui/custom-dropdown';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import productImage from '../../../../public/images/productImage.jpg';
import separatorIcon from '../../../../public/icons/separatorIcon.svg';
import Image from 'next/image';

const productTags = [
  '손가락감지',
  '라이트커튼',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
  '세이프티',
];

const modelNames = ['Model Name', 'Model Name', 'Model Name'];

const specifications = [
  { label: 'Supply voltage', value: '10..30VDC' },
  { label: 'Light source', value: 'Red LED (625nm) / Laser light, Class 1' },
  { label: 'Switching output', value: 'PNP / NPN' },
  {
    label: 'Switching mode',
    value: ['Light on: white wire to U+ / suspended', 'Dark on: white wire to U-'],
  },
  { label: 'No-load supply current', value: '≤20mA' },
  { label: 'Load supply current', value: '≤100mA' },
  { label: 'Sensitivity', value: 'Potentiometer adjustment' },
  { label: 'LED', value: 'Power (green), output state (yellow)' },
  { label: 'Housing material', value: 'Polycarbonate' },
  { label: 'Lens material', value: 'PMMA' },
  { label: 'Connection', value: 'M8 connector / 2 m cable' },
  { label: 'Ambient operation temperature', value: '-25。 C..+55。 C' },
  { label: 'Ambient storage temperature', value: '-40。 C..+70。 C' },
  { label: 'Protection class', value: 'IP67' },
];

const downloadItems = [
  {
    category: '매뉴얼',
    type: 'PDF',
    name: 'SLC Series',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
  {
    category: 'CAD',
    type: 'DWG',
    name: '2D CAD (SLC Series)',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
  {
    category: 'CAD',
    type: 'STEP',
    name: '3D CAD (SLC Series)',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
  {
    category: '인증서 > 국내인증',
    type: 'PDF',
    name: 'SLC Series',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
  {
    category: '인증서 > 유럽인증',
    type: 'PDF',
    name: 'SLC Series CE Mark',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
  {
    category: '인증서 > 국내인증',
    type: 'PDF',
    name: 'SLC Series',
    options: ['옵션아이템', '옵션아이템', '옵션아이템'],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState('상세설명');
  const [selectedModel, setSelectedModel] = React.useState('Model Name');

  return (
    <div className="flex flex-col items-center relative size-full min-h-screen">
      <Header currentPath={pathname} />
      
      <div className="flex flex-col grow items-center w-full pt-16 lg:pt-20">
        <div className="bg-white flex flex-col items-start px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-[68px] w-full max-w-[1200px]">
          {/* Breadcrumb and Title */}
          <div className="border-b border-[var(--color-button-gray-outlined-border-default)] flex flex-col md:flex-row items-start md:items-end justify-between gap-2 pb-1 pt-0 px-0 w-full">
            <p className="font-semibold leading-6 text-xl md:text-2xl lg:text-[30px] text-[var(--color-text-strong)]">
              SLC(9) Series
            </p>
            <p className="font-normal leading-6 text-xs md:text-sm lg:text-[13px] text-[var(--color-text-basic)]">
              <span>Home &gt; 제품소개 &gt; 포토센서 &gt; </span>
              <span className="font-semibold text-[var(--color-text-strong)]">SLC(9) Series</span>
            </p>
          </div>
          <div className="h-3 w-full" />

          {/* Product Image and Info */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[360px] items-start w-full">
            <div className="flex flex-col grow h-[360px] items-center overflow-clip p-10">
              <div className="aspect-[310/392] grow relative">
                <Image
                  alt=""
                  className="absolute inset-0 max-w-none object-cover object-[50%_50%] pointer-events-none size-full"
                  src={productImage}
                />
              </div>
            </div>
            <div className="flex flex-col grow h-full items-start pb-0 pt-10 px-0">
              <div className="flex flex-col gap-1 items-start p-5 w-full">
                <div className="flex gap-1 items-end">
                  <p className="font-semibold leading-[1.25] text-2xl text-[var(--color-text-strong)] whitespace-nowrap">
                    SLC(9) Series
                  </p>
                  <div className="flex items-center justify-center px-2 py-1 rounded-[50px]">
                    <Badge variant="destructive" className="text-xs font-semibold">
                      NEW
                    </Badge>
                  </div>
                </div>
                <p className="font-normal leading-6 text-sm text-[var(--color-text-strong)] whitespace-nowrap">
                  세이프티 라이트커튼
                </p>
              </div>
              <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-start p-5 w-full">
                <div className="font-normal leading-6 text-sm text-[var(--color-text-basic)] w-full">
                  <p className="mb-0">
                    고성능 및 25.4mm 표준 장착 구멍 거리를 갖춘 미니 직사각형 광전 센서 OS10 시리즈는
                  </p>
                  <p className="mb-0">
                    BGS(배경 억제) 모드, 확산 반사 모드, 역반사 모드 및 관통 빔 모드로 제공됩니다.
                  </p>
                  <p className="mb-0">
                    적색 빔 또는 레이저 빔 소스(옵션)를 사용하면 인쇄 및 포장, 제약, 전자, 소형 장비 및 기타 응용
                  </p>
                  <p>분야에 적합합니다.</p>
                </div>
              </div>
              <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-wrap gap-2 items-center p-5 w-full">
                {productTags.map((tag, idx) => (
                  <React.Fragment key={`${tag}-${idx}`}>
                    <p className="font-bold leading-[1.25] text-[13px] text-[var(--color-primary-600)] text-center whitespace-nowrap">
                      {tag}
                    </p>
                    {idx < productTags.length - 1 && (
                      <div className="h-3 relative w-0">
                        <div className="absolute inset-[0_-0.5px]">
                          <img
                            alt=""
                            className="block max-w-none size-full"
                            src={separatorIcon}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="h-9 w-full" />

          {/* Tabs */}
          <CustomTabs value={activeTab} onValueChange={setActiveTab} variant="horizontal">
            <CustomTabsList variant="horizontal" className="gap-2 w-full overflow-x-auto">
              <CustomTabsTrigger value="상세설명" variant="horizontal" className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap">
                상세설명
              </CustomTabsTrigger>
              <CustomTabsTrigger value="동영상자료" variant="horizontal" className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap">
                동영상자료
              </CustomTabsTrigger>
              <CustomTabsTrigger value="다운로드" variant="horizontal" className="px-2 md:px-2.5 py-2 md:py-2.5 text-sm md:text-base lg:text-lg whitespace-nowrap">
                다운로드
              </CustomTabsTrigger>
            </CustomTabsList>

            {/* Description Tab Content */}
            <CustomTabsContent value="상세설명" className="mt-3">
              <div className="h-3 w-full" />
              <div className="bg-[var(--color-grey-50)] flex flex-col gap-5 items-start p-4 md:p-5 w-full">
                <div className="font-normal leading-0 text-[var(--color-text-strong)] w-full">
                  <p className="font-bold leading-6 mb-0 text-[15px]">Description</p>
                  <p className="leading-6 mb-0 text-[15px]">
                    Mini-rectangular photoelectric sensors OS10 series, with high performance and
                    25.4mm standard mounting hole distance, are available as BGS (background
                    suppression) mode, diffuse reflective mode, retro-reflective mode, and
                    through-beam mode. With optional red beam or laser beam source, they are
                    suitable for printing and packaging, pharmaceutical, electronic, small equipment
                    and other application fields.
                  </p>
                  <p className="leading-6 mb-0 text-[15px]">&nbsp;</p>
                  <p className="font-bold leading-6 mb-0 text-[var(--color-text-strong)] text-[15px]">
                    Features
                  </p>
                  <ul className="list-disc">
                    <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
                      <span className="leading-6 text-[15px]">
                        BGS function has greatly improved the detection effect
                      </span>
                    </li>
                    <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
                      <span className="leading-6 text-[15px]">Optional red beam or laser beam</span>
                    </li>
                    <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
                      <span className="leading-6 text-[15px]">Adjustable sensing range</span>
                    </li>
                    <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
                      <span className="leading-6 text-[15px]">Protection class IP67</span>
                    </li>
                    <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
                      <span className="leading-6 text-[15px]">
                        Optional M8 connector, 2 m pre-wired cable
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[var(--color-grey-300)] flex h-[200px] md:h-[300px] lg:h-[400px] items-center justify-center rounded-lg w-full">
                  <p className="font-semibold leading-[1.25] text-lg md:text-xl lg:text-2xl text-[var(--color-text-strong)] whitespace-nowrap">
                    이미지 영역
                  </p>
                </div>
              </div>

              <div className="h-12 w-full" />

              {/* Model Selection */}
              <div className="flex flex-col items-center w-full">
                <div className="flex gap-1 items-start w-full">
                  <ChipGroup value={selectedModel} onValueChange={setSelectedModel} size="large">
                    {modelNames.map((name, idx) => (
                      <ChipGroupItem key={`${name}-${idx}`} value={name}>
                        {name}
                      </ChipGroupItem>
                    ))}
                  </ChipGroup>
                </div>
                <div className="h-3 w-full" />

                {/* Specifications Table */}
                <div className="border-t border-[var(--color-grey-900)] flex flex-col items-center pb-0 pt-px px-0 w-full overflow-x-auto">
                  <div className="min-w-[600px] w-full">
                    {specifications.map((spec, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row items-start w-full">
                        <div className="bg-[var(--color-grey-50)] border-r-0 md:border-r border-b border-[var(--color-grey-350)] flex items-center px-4 md:px-5 py-3 md:py-4 w-full md:w-[360px]">
                          <p className="font-semibold leading-6 text-sm md:text-base text-[var(--color-text-strong)] whitespace-nowrap">
                            {spec.label}
                          </p>
                        </div>
                        <div className="border-b border-[var(--color-grey-350)] flex grow items-center px-4 md:px-5 py-3 md:py-4 w-full">
                        {Array.isArray(spec.value) ? (
                          <div className="flex flex-col w-full">
                            {spec.value.map((val, valIdx) => (
                              <div
                                key={valIdx}
                                className="border-b border-[var(--color-grey-350)] flex items-center px-5 py-4 w-full last:border-b-0"
                              >
                                <p className="font-normal leading-6 text-sm md:text-base text-[var(--color-text-strong)] break-words md:whitespace-nowrap">
                                  {val}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-normal leading-6 text-sm md:text-base text-[var(--color-text-strong)] break-words md:whitespace-nowrap">
                            {spec.value}
                          </p>
                        )}
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </CustomTabsContent>

            {/* Download Tab Content */}
            <CustomTabsContent value="다운로드" className="mt-3">
              <div className="h-3 w-full" />
              <div className="flex flex-wrap gap-4 md:gap-5 items-start w-full">
                {downloadItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[var(--color-button-gray-outlined-border-default)] flex flex-col items-center relative rounded-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.625rem)] lg:w-[386.667px]"
                  >
                    <div className="border-t border-[var(--color-button-gray-outlined-border-default)] flex flex-col gap-1 items-start p-4 md:p-5 w-full">
                      <p className="font-medium leading-6 text-xs md:text-[13px] text-[var(--color-text-basic)] whitespace-nowrap">
                        {item.category}
                      </p>
                      <div className="flex gap-2 items-end px-0 py-1 flex-wrap">
                        <div
                          className={`border flex items-center justify-center px-1 py-0.5 rounded-sm ${
                            item.type === 'PDF'
                              ? 'bg-[var(--color-error-100)] border-[var(--color-error-300)]'
                              : 'bg-[var(--color-success-100)] border-[var(--color-success-300)]'
                          }`}
                        >
                          <p
                            className={`font-medium leading-[1.25] text-xs text-center whitespace-nowrap ${
                              item.type === 'PDF'
                                ? 'text-[var(--color-error-600)]'
                                : 'text-[var(--color-success-600)]'
                            }`}
                          >
                            {item.type}
                          </p>
                        </div>
                        <p className="font-medium leading-none text-base md:text-lg text-[var(--color-text-strong)] text-center break-words md:whitespace-nowrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-1.5 items-stretch sm:items-start justify-center pb-4 md:pb-5 pt-0 px-4 md:px-5 w-full">
                      <CustomDropdown>
                        <CustomDropdownTrigger className="grow min-w-0">
                          <CustomDropdownValue placeholder="모델을 선택하세요" />
                        </CustomDropdownTrigger>
                        <CustomDropdownContent>
                          {item.options.map((option, optIdx) => (
                            <CustomDropdownItem key={optIdx} value={option}>
                              {option}
                            </CustomDropdownItem>
                          ))}
                        </CustomDropdownContent>
                      </CustomDropdown>
                      <Button
                        variant="default"
                        className="bg-[var(--color-grey-850)] text-white min-h-9 px-3 py-2 rounded-md text-xs sm:text-sm font-bold gap-0.5 w-full sm:w-auto"
                      >
                        <span>다운로드</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CustomTabsContent>
          </CustomTabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
