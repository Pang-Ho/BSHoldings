'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { ProductMegaMenu } from '@/components/product-mega-menu';
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

import Image from 'next/image';
import logoColor from '../../public/icons/logo_color.svg';
import logoWhite from '../../public/icons/logo_white.svg';

interface HeaderProps {
  currentPath?: string;
  isTransparent?: boolean;
}

const getMobileMenuItemClasses = (isActive: boolean) =>
  cn(
    'px-4 py-3 text-base font-semibold rounded-md transition-colors',
    isActive
      ? 'text-(--color-primary-500) bg-(--color-primary-50)'
      : 'text-(--color-text-strong) hover:bg-(--color-grey-50)',
  );

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
          : 'bg-white border-(--color-grey-300)',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex h-16 w-40 items-center justify-start">
          <Link href="/" className="relative h-8 w-40">
            <Image
              alt="BS Holdings Logo"
              className={cn(
                'absolute h-full w-full object-cover object-[50%_50%] transition-opacity duration-300',
                isTransparent ? 'opacity-100' : 'opacity-0',
              )}
              src={logoWhite}
              priority
            />
            <Image
              alt=""
              className={cn(
                'absolute h-full w-full object-cover object-[50%_50%] transition-opacity duration-300',
                isTransparent ? 'opacity-0' : 'opacity-100',
              )}
              src={logoColor}
              priority
            />
          </Link>
        </div>

        {/* Navigation Menu - Desktop */}
        <NavigationMenu viewport={false} className="hidden lg:flex flex-1">
          <NavigationMenuList className="gap-0">
            {/* 제품소개 with dropdown */}
            <NavigationMenuItem
              state={isProductsActive ? 'selected' : 'default'}
            >
              <NavigationMenuTrigger
                selected={isProductsActive}
                isTransparent={isTransparent}
              >
                제품소개
              </NavigationMenuTrigger>
              <NavigationMenuContent className="fixed! w-screen! md:w-screen! left-0! top-16! p-0! m-0! rounded-none! shadow-none! ring-0! bg-transparent!">
                <ProductMegaMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 회사소개 */}
            <NavigationMenuItem
              state={isCompanyActive ? 'selected' : 'default'}
            >
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/company"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isTransparent
                      ? 'text-white bg-transparent hover:bg-white/10 focus:bg-transparent' //hover:text-(--color-primary-800)
                      : 'text-(--color-text-strong)',
                    isCompanyActive &&
                      (isTransparent
                        ? 'border-b-2 border-white'
                        : 'border-b-2 border-(--color-primary-500)'),
                  )}
                >
                  회사소개
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 오시는길 */}
            <NavigationMenuItem
              state={isLocationActive ? 'selected' : 'default'}
            >
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/location"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isTransparent
                      ? 'text-white bg-transparent hover:bg-white/10 focus:bg-transparent' //hover:text-(--color-primary-800)
                      : 'text-(--color-text-strong)',
                    isLocationActive &&
                      (isTransparent
                        ? 'border-b-2 border-white'
                        : 'border-b-2 border-(--color-primary-500)'),
                  )}
                >
                  오시는길
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 고객센터 with dropdown */}
            <NavigationMenuItem
              state={isContactActive ? 'selected' : 'default'}
            >
              <NavigationMenuTrigger
                selected={isContactActive}
                isTransparent={isTransparent}
                isArrow={false}
              >
                고객센터
              </NavigationMenuTrigger>
              <NavigationMenuContent className="top-16! p-0! shadow-xl! bg-white! border! border-(--color-grey-200)!">
                <div className="px-6 py-5">
                  <p className="text-2xl font-bold text-(--color-text-strong) tracking-tight whitespace-nowrap">
                    031 - 411 - 5011
                  </p>
                  <div className="mt-3 text-sm text-(--color-text-default) space-y-0.5">
                    <p>
                      <span className="font-medium">평일</span>: 오전 9시 ~ 오후
                      6시
                    </p>
                    <p>토, 일, 공휴일 휴무</p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          {/* Phone Number Button - Desktop */}
          <div
            // variant="outline"
            className={cn(
              'hidden md:flex h-12 lg:h-14 rounded-md px-2 lg:px-3 py-2 text-base lg:text-lg font-bold leading-[22.5px] transition-all duration-300 border-none bg-transparent shadow-none items-center',
              isTransparent
                ? 'bg-transparent text-white hover:bg-white/10 hover:text-white'
                : 'text-(--color-button-primary-text-basic) hover:bg-white hover:text-(--color-button-primary-text-basic)',
            )}
          >
            <span className="hidden lg:inline">031-411-5011</span>
            <span className="lg:hidden">031-411-5011</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isTransparent ? 'text-white' : ''}`} />
            ) : (
              <Menu
                className={`h-6 w-6 ${isTransparent ? 'text-white' : ''}`}
              />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-(--color-grey-300) bg-white w-full">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link
              href="/products"
              className={getMobileMenuItemClasses(isProductsActive)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              제품소개
            </Link>
            <Link
              href="/company"
              className={getMobileMenuItemClasses(isCompanyActive)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              회사소개
            </Link>
            <Link
              href="/location"
              className={getMobileMenuItemClasses(isLocationActive)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              오시는길
            </Link>
            {/* 고객센터 섹션 */}
            <div className="pt-2 border-t border-(--color-grey-200)">
              <p className="px-4 py-2 text-sm font-medium text-(--color-text-weak)">
                고객센터
              </p>
              <a
                href="tel:031-411-5011"
                className="block px-4 py-2 text-xl font-bold text-(--color-primary-500)"
              >
                031-411-5011
              </a>
              <div className="px-4 pb-2 text-sm text-(--color-text-default) space-y-0.5">
                <p>
                  <span className="font-medium">평일</span>: 오전 9시 ~ 오후 6시
                </p>
                <p>토, 일, 공휴일 휴무</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
