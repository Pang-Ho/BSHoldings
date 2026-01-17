'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: [
          'text-[var(--button-gray-text-deep)] bg-white border border-[var(--color-button-gray-outlined-border-default)]',
          'hover:text-[var(--primary-800)] hover:bg-white hover:border-[var(--color-button-gray-outlined-border-default)]',
          'data-[selected=true]:text-white data-[selected=true]:bg-[var(--grey-850)] data-[selected=true]:border-transparent',
        ],
      },
      size: {
        medium: 'h-[30px] px-3',
        large: 'h-[34px] px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'large',
    },
  },
);

interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  children: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { className, variant, size, selected = false, children, onClick, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(chipVariants({ variant, size, className }))}
        data-selected={selected}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Chip.displayName = 'Chip';

// ChipGroupItem 인터페이스를 먼저 정의
interface ChipGroupItemProps extends Omit<ChipProps, 'selected' | 'onClick'> {
  value: string;
}

// 단일 선택 칩 그룹 컴포넌트
interface ChipGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  size?: 'medium' | 'large';
}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    { value, onValueChange, children, className, size = 'large', ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn('flex gap-2', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === ChipGroupItem) {
            const childProps = child.props as ChipGroupItemProps;
            return React.cloneElement(child as React.ReactElement<ChipProps>, {
              ...childProps,
              size,
              selected: value === childProps.value,
              onClick: () => onValueChange?.(childProps.value),
            });
          }
          return child;
        })}
      </div>
    );
  },
);
ChipGroup.displayName = 'ChipGroup';

const ChipGroupItem = React.forwardRef<HTMLButtonElement, ChipGroupItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <Chip ref={ref} {...props}>
        {children}
      </Chip>
    );
  },
);
ChipGroupItem.displayName = 'ChipGroupItem';

export { Chip, ChipGroup, ChipGroupItem, chipVariants };
