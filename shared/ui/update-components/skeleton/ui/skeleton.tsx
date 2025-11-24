import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../../../lib/tailwind-merge';
import styles from './skeleton.module.css';

type StyleOptionsToCssProperties = {
  width?: string | number;
  height?: string | number;
};

type SkeletonProps = {
  className?: string;
  count?: number;
} & StyleOptionsToCssProperties;

const skeleton = cva('flex', {
  variants: {
    empty: {
      xs: 'gap-1',
      s: 'gap-sm-2-vw sm:gap-3',
    },
  },
});

const styleOptionsToCssProperties = ({
  width,
  height,
}: StyleOptionsToCssProperties) => {
  const style: StyleOptionsToCssProperties = {};

  if (typeof width === 'string' || typeof width === 'number')
    style.width = width;
  if (typeof height === 'string' || typeof height === 'number')
    style.height = height;

  return style;
};

export const Skeleton = ({
  className,
  count = 1,
  width = '100%',
  height = 10,
  empty = 's',
}: SkeletonProps & VariantProps<typeof skeleton>) => {
  const fillArray = new Array(count).fill(0);
  const style = styleOptionsToCssProperties({ width, height });

  return (
    <div className={cn(skeleton({ empty, className }))}>
      {fillArray.map((_, index) => (
        <div
          key={index}
          role="status"
          className={styles.skeleton}
          style={style}
        />
      ))}
    </div>
  );
};
