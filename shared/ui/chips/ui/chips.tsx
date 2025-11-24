import clsx from 'clsx';
import { cva, VariantProps } from 'cva';
import { forwardRef, Ref } from 'react';

import { cn } from '../../../lib/tailwind-merge';
import { Tag } from '../../tag';
import { withDefaultGetters } from '../lib/helpers';
import { ChipsComponent, ChipsProps } from '../lib/types/chip.types';

const chips = cva('cursor-pointer', {
  variants: {
    view: {
      primary: 'bg-transparent text-white',
      secondary: 'bg-white text-gray-dark',
      ghost: 'bg-gray-extra-light text-gray-dark',
    },
  },
  defaultVariants: {
    view: 'primary',
  },
});

export type ChipsVariants = VariantProps<typeof chips>;

const ChipsRender = (props: ChipsProps, ref: Ref<HTMLDivElement>) => {
  const {
    getItemLabel,
    getItemActive,
    items,
    onItemClick,
    chipClassName,
    className,
    view = 'primary',
  } = withDefaultGetters(props);

  return (
    <div
      className={clsx(
        className,
        'flex flex-wrap items-center gap-sm-1-vw sm:gap-2',
      )}
      ref={ref}
    >
      {items.map((item, index) => (
        <Tag
          key={item.label || index}
          size="m"
          isActive={getItemActive(item)}
          onClick={(e) => onItemClick?.(item, { e })}
          classes={cn(chips({ view, className: chipClassName }))}
        >
          {getItemLabel(item)}
        </Tag>
      ))}
    </div>
  );
};

export const Chips = forwardRef(ChipsRender) as ChipsComponent;
