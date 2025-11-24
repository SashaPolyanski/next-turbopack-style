import { clsx } from 'clsx';
import { CSSProperties, ElementType, FC } from 'react';

import { getSpaces } from '@/shared/lib/typograf';

import styles from './Heading.module.scss';

type HeadingVariantsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type FontColorsType = 'primary' | 'secondary' | 'tertiary' | 'accent';

type HeadingPropsType = {
  variant: HeadingVariantsType;
  color?: FontColorsType;
  children: string | React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Heading: FC<HeadingPropsType & { as?: ElementType }> = ({
  variant,
  color = 'primary',
  children,
  as: Component = variant,
  className = '',
  style,
}) => {
  return (
    <Component
      className={clsx(styles[variant], styles[color], className)}
      style={style}
    >
      {typeof children === 'string' ? getSpaces(children) : children}
    </Component>
  );
};
