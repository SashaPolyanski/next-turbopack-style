import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { forwardRefWithAs } from '../../lib/types/props-with-as-attributes';

interface ITag {
  children: ReactNode;
  classes?: string;
  size?: 's' | 'm';
  bgColor?: string;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean;
}

export const Tag = forwardRefWithAs<ITag, 'span'>(
  (
    {
      children,
      classes = '',
      size = 's',
      bgColor,
      isActive,
      as = 'span',
      ...props
    },
    ref,
  ) => {
    const TagComponent = as as string;

    return (
      <TagComponent
        ref={ref}
        className={clsx(
          {
            'rounded-sm-2-vw px-sm-2-vw py-sm-1-vw text-sm-s-vw font-normal sm:rounded-xl-2 sm:px-3 sm:py-[2px] sm:text-m':
              size === 's',
            'rounded-full px-sm-3-vw py-[3.125vw] text-sm-ls-vw sm:px-5 sm:py-[10px] sm:text-m':
              size === 'm',
            'bg-[#434343]': !bgColor,
            '!bg-primary text-white': isActive,
          },
          bgColor,
          'transition duration-300 ease-in-out',
          classes,
        )}
        {...props}
      >
        {children}
      </TagComponent>
    );
  },
);
