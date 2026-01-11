import { cva } from 'class-variance-authority';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'max-w-max group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'gap-0 group flex flex-1 list-none items-center justify-center',
        className,
      )}
      {...props}
    />
  );
}

interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
  state?: 'default' | 'selected'; // 커스텀 state 프롭 추가
}

function NavigationMenuItem({
  className,
  state = 'default',
  ...props
}: NavigationMenuItemProps) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', 'group', className)}
      data-selected={state === 'selected'}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  'focus:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent data-open:bg-transparent focus-visible:ring-ring/50 data-popup-open:bg-transparent data-popup-open:hover:bg-transparent px-5 py-5 text-base font-semibold leading-6 text-[var(--color-text-strong)] transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:opacity-50 group/navigation-menu-trigger inline-flex h-16 w-max items-center justify-center disabled:pointer-events-none outline-none',
  {
    variants: {
      selected: {
        true: 'border-b-[2px] border-[var(--color-primary-500)]',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface NavigationMenuTriggerProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> {
  selected?: boolean;
  isTransparent?: boolean;
}

function NavigationMenuTrigger({
  className,
  children,
  selected = false,
  isTransparent = false,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        navigationMenuTriggerStyle({ selected }),
        'group transition-colors duration-300',
        isTransparent
          ? 'text-white hover:text-[var(--color-primary-800)] bg-transparent'
          : 'text-[var(--color-text-strong)]',
        className,
      )}
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        className={cn(
          'relative top-[1px] ml-1 size-5 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180',
          isTransparent
            ? 'text-white group-data-open/navigation-menu-trigger:text-[var(--color-primary-800)]'
            : 'text-[var(--color-text-strong)]',
        )}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:ring-foreground/10 p-2 pr-2.5 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:duration-300 top-0 left-0 w-full group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto',
        className,
      )}
      {...props}
    />
  );
}

const navigationMenuLinkItemVariants = cva(
  'block rounded-sm px-2 py-1.5 text-[15px] leading-[22.5px] transition-colors',
  {
    variants: {
      variant: {
        default:
          'text-[var(--color-grey-750)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-strong)]',
        active:
          'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const navigationMenuContentTitleVariants = cva(
  'font-semibold leading-[27px] text-[var(--color-text-strong)]',
  {
    variants: {
      size: {
        default: 'text-lg',
        large: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 isolate z-50 flex justify-center',
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:zoom-out-95 data-open:zoom-in-90 ring-foreground/10 rounded-lg shadow ring-1 duration-100 origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  isTransparent = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
  isTransparent?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 focus-visible:ring-ring/50 focus:bg-muted flex items-center gap-1.5 rounded-sm p-2 text-base transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        isTransparent
          ? 'text-white hover:text-[var(--color-primary-800)] bg-transparent'
          : 'text-[var(--color-text-strong)] hover:bg-muted ',
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-border rounded-tl-sm shadow-md relative top-[60%] h-2 w-2 rotate-45" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
  navigationMenuLinkItemVariants,
  navigationMenuContentTitleVariants,
};
