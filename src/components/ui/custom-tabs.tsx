'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const customTabsVariants = cva('group/custom-tabs flex', {
  variants: {
    variant: {
      horizontal: 'flex-col',
      vertical: 'flex-row',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

interface CustomTabsProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Root>, 'orientation'>,
    VariantProps<typeof customTabsVariants> {
  variant?: 'horizontal' | 'vertical';
}

function CustomTabs({
  className,
  variant = 'horizontal',
  ...props
}: CustomTabsProps) {
  const orientation = variant === 'vertical' ? 'vertical' : 'horizontal';

  return (
    <TabsPrimitive.Root
      data-slot="custom-tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(customTabsVariants({ variant }), className)}
      {...props}
    />
  );
}

const customTabsListVariants = cva('inline-flex items-center justify-start', {
  variants: {
    variant: {
      horizontal: 'flex-row gap-2',
      vertical: 'flex-col gap-3 w-fit',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

interface CustomTabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof customTabsListVariants> {
  variant?: 'horizontal' | 'vertical';
}

function CustomTabsList({
  className,
  variant = 'horizontal',
  ...props
}: CustomTabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="custom-tabs-list"
      data-variant={variant}
      className={cn(customTabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

const customTabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        horizontal: [
          'text-lg leading-[23px] px-2.5 py-2.5 h-[43px]',
          'text-[var(--button-gray-text-deep)] bg-white',
          'hover:text-[var(--primary-800)] hover:bg-white',
          'data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:mb-[-2px]',
        ],
        vertical: [
          'text-lg leading-[25px] px-4 py-3 w-[200px] h-[49px] justify-start',
          'text-[var(--grey-700)] bg-white',
          'hover:text-black hover:bg-[var(--grey-50)]',
          'data-[state=active]:text-[var(--primary)] data-[state=active]:bg-[var(--primary-50)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'horizontal',
    },
  },
);

interface CustomTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof customTabsTriggerVariants> {
  variant?: 'horizontal' | 'vertical';
}

function CustomTabsTrigger({
  className,
  variant = 'horizontal',
  ...props
}: CustomTabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="custom-tabs-trigger"
      data-variant={variant}
      className={cn(customTabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function CustomTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="custom-tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  customTabsListVariants,
  CustomTabsTrigger,
  customTabsTriggerVariants,
  customTabsVariants,
};
