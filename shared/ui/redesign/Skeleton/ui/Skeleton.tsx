import { clsx } from 'clsx';

import styles from './Skeleton.module.scss';

type StyleOptionsToCssProperties = {
  width?: string | number;
  height?: string | number;
};

type SkeletonProps = {
  className?: string;
  rootClassName?: string;
  count?: number;
  round?: boolean;
} & StyleOptionsToCssProperties;
type EmptyType = 'xs' | 's';

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
  round,
  rootClassName,
}: SkeletonProps & { empty?: EmptyType }) => {
  const fillArray = new Array(count).fill(0);
  const style = styleOptionsToCssProperties({ width, height });

  return (
    <div
      className={clsx(styles.wrapper, styles[`empty-${empty}`], rootClassName)}
    >
      {fillArray.map((_, index) => (
        <div
          key={index}
          role="status"
          className={clsx(
            styles.skeleton,
            { [styles.round]: round },
            className,
          )}
          style={style}
        />
      ))}
    </div>
  );
};
