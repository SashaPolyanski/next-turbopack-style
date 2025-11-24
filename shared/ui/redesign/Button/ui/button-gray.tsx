import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { ButtonThemeComponentProps } from '../lib/types';
import { Button } from './button';
import styles from './ButtonGray.module.scss';

export const ButtonGray = forwardRef<
  HTMLButtonElement,
  ButtonThemeComponentProps<'gray'>
>(({ view = 'primary', children, disabled, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={clsx(styles[view], { [styles.disabled]: disabled }, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
});
