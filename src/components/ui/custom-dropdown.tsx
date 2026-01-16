'use client';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

function CustomDropdown({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return (
    <SelectPrimitive.Root data-slot="custom-dropdown" {...props} />
  );
}

function CustomDropdownValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="custom-dropdown-value"
      className={cn('truncate', className)}
      {...props}
    />
  );
}

function CustomDropdownGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="custom-dropdown-group"
      className={cn('p-1', className)}
      {...props}
    />
  );
}

function CustomDropdownTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="custom-dropdown-trigger"
      className={cn(
        // 기본 스타일
        'inline-flex items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer select-none transition-all',
        // 크기 및 패딩
        'w-[120px] h-[36px] px-3 py-2',
        // 테두리 및 배경
        'bg-white rounded-[2px]',
        // 기본 상태 - border 1px
        'border border-[var(--button-gray-filled-border-default)]',
        // hover 상태 - border 1.2px
        'hover:border-[1.2px] hover:border-[var(--button-primary-outlined-border-default)]',
        // focus/selected 상태 - border 1px
        'focus:border focus:border-[var(--grey-850)] data-[state=open]:border data-[state=open]:border-[var(--grey-850)]',
        // 포커스 링 제거
        'focus-visible:outline-none focus-visible:ring-0',
        // 텍스트 스타일
        'text-sm font-medium',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
        <div className="truncate">{children}</div>
      </div>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-gray-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function CustomDropdownContent({
  className,
  children,
  position = 'popper',
  align = 'start',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="custom-dropdown-content"
        className={cn(
          // 기본 스타일
          'relative z-50 max-h-96 overflow-hidden rounded-md bg-white shadow-lg',
          // 애니메이션
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          // 테두리
          'border border-gray-200',
          // 너비를 트리거와 동일하게 설정
          'w-[var(--radix-select-trigger-width)] min-w-[120px]',
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <CustomDropdownScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <CustomDropdownScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function CustomDropdownItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [isTextTruncated, setIsTextTruncated] = React.useState(false);

  React.useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const scrollWidth = textRef.current.scrollWidth;
        const clientWidth = textRef.current.clientWidth;
        const isOverflowing = scrollWidth > clientWidth;

        // 디버깅을 위한 로그 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('Text truncation check:', {
            text: children,
            scrollWidth,
            clientWidth,
            isOverflowing,
          });
        }

        setIsTextTruncated(isOverflowing);
      }
    };

    // 약간의 지연을 두고 체크 (렌더링 완료 후)
    const timeoutId = setTimeout(checkTruncation, 100);

    window.addEventListener('resize', checkTruncation);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [children]);

  const textContent = (
    <SelectPrimitive.ItemText asChild>
      <span
        ref={textRef}
        className="flex-1 min-w-0 pr-2"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </SelectPrimitive.ItemText>
  );

  return (
    <SelectPrimitive.Item
      data-slot="custom-dropdown-item"
      className={cn(
        // 기본 스타일
        'relative flex w-full cursor-pointer select-none items-center rounded-[2px] px-3 py-2 text-sm outline-none',
        // 높이
        'h-[32px]',
        // hover 상태
        'hover:bg-[var(--primary-50)]',
        // focus 상태
        'focus:bg-[var(--primary-50)]',
        // disabled 상태
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {isTextTruncated ? (
        <Tooltip>
          <TooltipTrigger asChild>{textContent}</TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {children}
          </TooltipContent>
        </Tooltip>
      ) : (
        textContent
      )}
      <SelectPrimitive.ItemIndicator className="flex h-4 w-4 items-center justify-center shrink-0">
        <CheckIcon className="h-4 w-4 text-[var(--primary-500)]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function CustomDropdownLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="custom-dropdown-label"
      className={cn('px-3 py-2 text-xs font-medium text-gray-500', className)}
      {...props}
    />
  );
}

function CustomDropdownSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="custom-dropdown-separator"
      className={cn('mx-1 my-1 h-px bg-gray-200', className)}
      {...props}
    />
  );
}

function CustomDropdownScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="custom-dropdown-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1 bg-white',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function CustomDropdownScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="custom-dropdown-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1 bg-white',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  CustomDropdown,
  CustomDropdownContent,
  CustomDropdownGroup,
  CustomDropdownItem,
  CustomDropdownLabel,
  CustomDropdownScrollDownButton,
  CustomDropdownScrollUpButton,
  CustomDropdownSeparator,
  CustomDropdownTrigger,
  CustomDropdownValue,
};
