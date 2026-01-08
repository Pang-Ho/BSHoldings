'use client';

import Link from 'next/link';
import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import logoColor from '../../public/icons/logo_color.svg';
import logoWhite from '../../public/icons/logo_white.svg';
import Image from 'next/image';

interface HeaderProps {
  currentPath?: string;
  isTransparent?: boolean;
}

export function Header({ currentPath, isTransparent = false }: HeaderProps) {
  const isProductsActive = currentPath?.startsWith('/products') ?? false;
  const isCompanyActive = currentPath === '/company';
  const isLocationActive = currentPath === '/location';
  const isContactActive = currentPath === '/contact';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ease-in-out',
        isTransparent
          ? 'bg-transparent border-transparent'
          : 'bg-white border-[var(--color-grey-300)]',
      )}
    >
      <div className="mx-auto flex h-16 lg:h-20 max-w-[1200px] items-center justify-between px-4 md:px-6 lg:px-0">
        {/* Logo */}
        <div className="flex h-16 lg:h-20 w-32 md:w-40 items-center justify-start">
          <Link href="/" className="relative h-7 md:h-8 w-32 md:w-40">
            <Image
              alt="BS Holdings Logo"
              className="h-full w-full object-cover object-[50%_50%]"
              src={isTransparent ? logoWhite : logoColor}
            />
          </Link>
        </div>

        {/* Navigation Menu - Desktop */}
        <NavigationMenu viewport={false} className="hidden lg:flex flex-1">
          <NavigationMenuList className="gap-0">
            {/* 제품소개 with dropdown */}
            <NavigationMenuItem state={isProductsActive ? 'selected' : 'default'}>
              <NavigationMenuTrigger selected={isProductsActive} isTransparent={isTransparent}>
                제품소개
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!fixed !w-screen md:!w-screen !left-0 !top-16 lg:!top-20">
                <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 pb-10 pt-6">
                  <div className="mb-4 px-0 py-1">
                    <h2 className={"text-2xl font-bold leading-6 text-[var(--color-text-strong)]"}>
                      제품소개
                    </h2>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-3">
                    {/* Column 1: 특수용 센서 */}
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          특수용 센서
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=proximity"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              근접센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=analog"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              아날로그 출력 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=high-pressure"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              고압용 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=welding"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              용접 전용 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=explosion-proof"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              방폭용 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=chemical-resistant"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              내 화학용 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=all-metal"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              All metal 센서
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: 포토센서 & 정전용량 센서 */}
                    <div className="flex flex-1 flex-col gap-5">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          포토센서
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=photo"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              포토센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=miniature-photo"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              초소형 포토센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=cylindrical-photo"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              원주형 포토 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=color-detection"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              색깔 감지용 포토 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=rectangular-photo"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              사각형 포토 센서
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          정전용량 센서
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=capacitive"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              정전용량 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=cylindrical-capacitive"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              원주형 정전용량 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=rectangular-capacitive"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              사각형 정전용량 센서
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: 초음파 센서, 고온 센서, 레벨 센서 */}
                    <div className="flex flex-1 flex-col gap-5">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          초음파 센서
                        </h3>
                      </div>
                      <div className="flex h-[113px] flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          고온 센서
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=high-temperature"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              고온 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=high-temperature-use"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              고온용 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=wide-temperature"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              사용온도 범위가 넓은 센서
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                      <div className="flex h-[113px] flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          레벨 센서
                        </h3>
                        <div className="flex flex-col gap-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=level"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              레벨 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=microwave-level"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              레벨 측정용 마이크로파 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=ultrasonic-level"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              레벨 측정용 소형 초음파 센서
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>

                    {/* Column 4: 엔코더, 레이저 센서, 세이프티, OEM */}
                    <div className="flex flex-1 flex-col gap-5">
                      <div className="flex h-6 flex-col">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          엔코더
                        </h3>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          레이저 센서
                        </h3>
                        <div className="flex flex-col gap-0.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=laser-1d"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              1D 레이저 변위 센서
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=laser-2d"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              2D 라인 레이저 스캐너
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          세이프티
                        </h3>
                        <div className="flex flex-col gap-0.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)]">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=safety-light-curtain"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              세이프티 라이트커튼
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products?category=safety-relay"
                              className="block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] text-[var(--color-grey-750)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]"
                            >
                              세이프티 릴레이
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold leading-[27px] text-[var(--color-text-strong)]">
                          주문제작용 센서 (OEM)
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 회사소개 */}
            <NavigationMenuItem state={isCompanyActive ? 'selected' : 'default'}>
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/company"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300',
                    isTransparent
                      ? 'text-white hover:text-[var(--color-primary-800)] bg-transparent'
                      : 'text-[var(--color-text-strong)] hover:text-[var(--color-text-strong)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isCompanyActive &&
                      (isTransparent
                        ? 'border-b-2 border-white text-white bg-transparent'
                        : 'border-b-2 border-[var(--color-primary-500)] text-[var(--color-text-strong)]'),
                  )}
                >
                  회사소개
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 오시는길 */}
            <NavigationMenuItem state={isLocationActive ? 'selected' : 'default'}>
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/location"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300',
                    isTransparent
                      ? 'text-white hover:text-[var(--color-primary-800)] bg-transparent'
                      : 'text-[var(--color-text-strong)] hover:text-[var(--color-text-strong)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isLocationActive &&
                      (isTransparent
                        ? 'border-b-2 border-white text-white bg-transparent'
                        : 'border-b-2 border-[var(--color-primary-500)] text-[var(--color-text-strong)]'),
                  )}
                >
                  오시는길
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 고객센터 */}
            <NavigationMenuItem state={isContactActive ? 'selected' : 'default'}>
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/contact"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300',
                    isTransparent
                      ? 'text-white hover:text-[var(--color-primary-800)] bg-transparent'
                      : 'text-[var(--color-text-strong)] hover:text-[var(--color-text-strong)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isContactActive &&
                      (isTransparent
                        ? 'border-b-2 border-white text-white bg-transparent'
                        : 'border-b-2 border-[var(--color-primary-500)] text-[var(--color-text-strong)]'),
                  )}
                >
                  고객센터
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Phone Number Button - Desktop */}
        <Button
          variant="outline"
          className={cn(
            'hidden md:flex h-12 lg:h-14 rounded-md px-2 lg:px-3 py-2 text-sm lg:text-lg font-bold leading-[22.5px] transition-all duration-300',
            isTransparent
              ? 'border-white bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white'
              : 'border border-[var(--color-button-primary-outlined-border-default)] bg-white text-[var(--color-button-primary-text-basic)] hover:bg-white hover:text-[var(--color-button-primary-text-basic)]',
          )}
        >
          <span className="hidden lg:inline">031-411-5011</span>
          <span className="lg:hidden">031-411-5011</span>
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-grey-300)] bg-white w-full">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link
              href="/products"
              className={cn(
                'px-4 py-3 text-base font-semibold rounded-md transition-colors',
                isProductsActive
                  ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                  : 'text-[var(--color-text-strong)] hover:bg-[var(--color-grey-50)]',
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              제품소개
            </Link>
            <Link
              href="/company"
              className={cn(
                'px-4 py-3 text-base font-semibold rounded-md transition-colors',
                isCompanyActive
                  ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                  : 'text-[var(--color-text-strong)] hover:bg-[var(--color-grey-50)]',
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              회사소개
            </Link>
            <Link
              href="/location"
              className={cn(
                'px-4 py-3 text-base font-semibold rounded-md transition-colors',
                isLocationActive
                  ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                  : 'text-[var(--color-text-strong)] hover:bg-[var(--color-grey-50)]',
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              오시는길
            </Link>
            <Link
              href="/contact"
              className={cn(
                'px-4 py-3 text-base font-semibold rounded-md transition-colors',
                isContactActive
                  ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                  : 'text-[var(--color-text-strong)] hover:bg-[var(--color-grey-50)]',
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              고객센터
            </Link>
            <div className="pt-2 border-t border-[var(--color-grey-300)]">
              <Button
                variant="outline"
                className="w-full h-12 rounded-md border border-[var(--color-button-primary-outlined-border-default)] bg-white text-base font-bold text-[var(--color-button-primary-text-basic)] hover:bg-white hover:text-[var(--color-button-primary-text-basic)]"
                asChild
              >
                <a href="tel:031-411-5011">031-411-5011</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
