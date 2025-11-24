import { clsx } from 'clsx';

import { forwardRefWithAs } from '../../lib/types/props-with-as-attributes';
import styles from './Card.module.scss';

type CardProps = {
  className?: string;
  size?: 'small' | 'medium';
  color?: 'primary';
};

export const Card = forwardRefWithAs<CardProps>((props, ref) => {
  const {
    children,
    className,
    as = 'div',
    size = 'medium',
    color = 'primary',
    ...otherProps
  } = props;

  const Tag = as as string;

  return (
    <Tag
      ref={ref}
      className={clsx(className, styles[size], styles[color])}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});
