import clsx from 'clsx';
import { ReactNode } from 'react';

interface IInfoLabel {
  className?: string;
  color?: 'black' | 'violet' | 'gray' | 'transparent';
  type?: 'outline' | 'fill';
  size?: 's';
  children: ReactNode;
}

export function InfoLabel({
  className,
  color = 'gray',
  type = 'fill',
  size = 's',
  children,
}: IInfoLabel) {
  return (
    <div
      className={clsx(
        className,
        {
          'bg-black text-white': color === 'black' && type === 'fill',
          'bg-violet text-white': color === 'violet' && type === 'fill',
          'bg-gray-extra-light text-gray-dark':
            color === 'gray' && type === 'fill',
          'bg-transparent border': type === 'outline',
          'border-gray-extra-light text-white':
            type === 'outline' && color === 'gray',
          'border-gray-light text-gray-dark':
            type === 'outline' && color === 'black',
          'h-sm-6-vw gap-sm-1-vw px-sm-2-vw pb-sm-2-vw pt-sm-2-vw text-sm-s-vw sm:h-9 sm:gap-[10px] sm:px-4 sm:pb-[7px] sm:pt-[5px] sm:text-sh':
            size === 's',
        },
        'flex items-center text-nowrap rounded-[100px]',
      )}
    >
      {children}
    </div>
  );
}
