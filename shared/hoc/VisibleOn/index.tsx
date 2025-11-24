'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type VisibleOnProps = { children: ReactNode; className?: string } & (
  | {
      mobile: true;
      desktop?: never;
    }
  | {
      mobile?: never;
      desktop: boolean;
    }
);

/**
 * Управляет видимостью потомка в зависимости от ширины экрана
 */
export const VisibleOn = ({
  desktop,
  mobile,
  children,
  className,
}: VisibleOnProps) => {
  return (
    <div
      className={clsx(
        {
          [styles.mobile]: mobile,
          [styles.desktop]: desktop,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
