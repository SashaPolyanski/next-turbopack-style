import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { ButtonThemeComponentProps } from '../lib/types';
import { Button } from './button';
import styles from './ButtonDark.module.scss';

export const ButtonDark = forwardRef<
  HTMLButtonElement,
  ButtonThemeComponentProps<'dark'>
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
