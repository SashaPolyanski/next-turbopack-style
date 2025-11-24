import { clsx } from 'clsx';
import React, { ElementType } from 'react';

import styles from './Badge.module.scss';

export type Variant = 'complete' | 'default' | 'clear';
export type BadgeSize = 'small' | 'medium';
export type FontColorsType = 'primary' | 'secondary';

export interface BadgeProps {
  variant?: Variant;
  size?: BadgeSize;
  iconLeft?: ElementType;
  children?: React.ReactNode;
  color?: FontColorsType;
  className?: string;
}

export const Badge = ({
  variant = 'default',
  size = 'small',
  iconLeft: IconComponent,
  children,
  color = 'primary',
  className,
}: BadgeProps) => {
  return (
    <div
      className={clsx(
        styles.badge,
        styles[`badge_${variant}`],
        styles[`badge_${size}`],
        className,
      )}
    >
      {IconComponent && (
        <span className={styles.icon}>
          <IconComponent />
        </span>
      )}
      {children && (
        <span className={clsx(styles.label, styles[color])}>{children}</span>
      )}
    </div>
  );
};
