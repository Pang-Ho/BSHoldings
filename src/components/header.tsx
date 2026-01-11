'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ProductMegaMenu } from '@/components/product-mega-menu';
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
            <NavigationMenuItem
              state={isProductsActive ? 'selected' : 'default'}
            >
              <NavigationMenuTrigger
                selected={isProductsActive}
                isTransparent={isTransparent}
              >
                제품소개
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!fixed !w-screen md:!w-screen !left-0 !top-16 lg:!top-20">
                <ProductMegaMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 회사소개 */}
            <NavigationMenuItem state={isCompanyActive ? 'selected' : 'default'}>
              <NavigationMenuLink isTransparent={isTransparent} asChild>
                <Link
                  href="/company"
                  className={cn(
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isTransparent
                      ? 'text-white hover:text-(--color-primary-800) bg-transparent'
                      : 'text-(--color-text-strong)',
                    isCompanyActive && (isTransparent ? 'border-b-2 border-white' : 'border-b-2 border-(--color-primary-500)'),
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
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isTransparent
                      ? 'text-white hover:text-(--color-primary-800) bg-transparent'
                      : 'text-(--color-text-strong)',
                    isLocationActive && (isTransparent ? 'border-b-2 border-white' : 'border-b-2 border-(--color-primary-500)'),
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
                    'inline-flex h-16 w-max items-center justify-center px-5 py-5 text-base font-semibold leading-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isTransparent
                      ? 'text-white hover:text-(--color-primary-800) bg-transparent'
                      : 'text-(--color-text-strong)',
                    isContactActive && (isTransparent ? 'border-b-2 border-white' : 'border-b-2 border-(--color-primary-500)'),
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
            'hidden md:flex h-12 lg:h-14 rounded-md px-2 lg:px-3 py-2 text-base lg:text-lg font-bold leading-[22.5px] transition-all duration-300',
            isTransparent
              ? 'border-white bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white'
              : 'border border-(--color-button-primary-outlined-border-default) bg-white text-(--color-button-primary-text-basic) hover:bg-white hover:text-(--color-button-primary-text-basic)',
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
            <Link
              href="/contact"
              className={getMobileMenuItemClasses(isContactActive)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              고객센터
            </Link>
            <div className="pt-2 border-t border-(--color-grey-300)">
              <Button
                variant="outline"
                className="w-full h-12 rounded-md border border-(--color-button-primary-outlined-border-default) bg-white text-base font-bold text-(--color-button-primary-text-basic) hover:bg-white hover:text-(--color-button-primary-text-basic)"
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
