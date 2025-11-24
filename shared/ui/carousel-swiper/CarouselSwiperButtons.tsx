import { clsx } from 'clsx';
import React, { ComponentPropsWithRef } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/svg';

import styles from './CarouselSwiper.module.scss';

interface ButtonPropType extends ComponentPropsWithRef<'button'> {
  className?: string;
  colors: string;
}

export const PrevButton = (props: ButtonPropType) => {
  const { children, className, colors, ...restProps } = props;

  return (
    <button
      className={clsx(styles.button, styles.prev, className, {
        [styles[colors]]: colors,
      })}
      type="button"
      {...restProps}
    >
      <ArrowLeftIcon />
      {children}
    </button>
  );
};

export const NextButton = (props: ButtonPropType) => {
  const { children, className, colors, ...restProps } = props;

  return (
    <button
      className={clsx(styles.button, styles.next, colors, className, {
        [styles[colors]]: colors,
      })}
      type="button"
      {...restProps}
    >
      <ArrowRightIcon />
      {children}
    </button>
  );
};
