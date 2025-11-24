import clsx from 'clsx';
import Link from 'next/link';
import { FC, forwardRef, SVGProps } from 'react';

import type { BaseButtonProps } from '../lib/types';
import styles from './Button.module.scss';

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      children,
      size = 's',
      className,
      onlyIcon = false,
      disabled = false,
      iconRight: IconRight,
      iconLeft: IconLeft,
      form = 'default',
      badgeClassName,
      isActive,
      iconClassName,
      onClick,
      href,
      target,
      ...props
    },
    ref,
  ) => {
    const renderIcon = (Icon: FC<SVGProps<SVGElement>>) => {
      return (
        <Icon
          className={clsx(
            'size-5 w-fit flex-none group-hover:opacity-75 group-active:opacity-50 sm:size-6',
            iconClassName,
          )}
        />
      );
    };

    const content = (
      <>
        {IconLeft && renderIcon(IconLeft)}
        {!onlyIcon && children}
        {IconRight && renderIcon(IconRight)}
        {isActive && (
          <div
            className={clsx(
              'absolute right-3.5 top-2.5 h-1 w-1 rounded-full bg-red-second sm:h-2 sm:w-2',
              badgeClassName,
            )}
          />
        )}
      </>
    );

    const classNames = clsx(
      styles.button,
      styles[`button_size_${size}`],
      styles[`button_form_${form}`],
      { [styles.disabled]: disabled, [styles.onlyIcon]: onlyIcon },
      className,
    );

    if (href) {
      return (
        <Link
          className={classNames}
          href={href}
          target={target}
          onClick={onClick}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        tabIndex={0}
        type="button"
        disabled={disabled}
        {...props}
        className={classNames}
        onClick={onClick}
        ref={ref}
      >
        {content}
      </button>
    );
  },
);
