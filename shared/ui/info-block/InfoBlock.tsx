import clsx from 'clsx';
import { ReactNode } from 'react';

interface IInfoBlock {
  className?: string;
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'black' | 'white' | 'blur' | 'image';
  size?: 'm' | 'l' | 'xl' | 'xxl';
}

export function InfoBlock({
  className,
  children,
  type = 'secondary',
  size = 'm',
}: IInfoBlock) {
  return (
    <div
      className={clsx(className, {
        'bg-violet text-white': type === 'primary',
        'bg-gray-extra-light text-gray-dark': type === 'secondary',
        'bg-gray-dark text-white': type === 'black',
        'bg-white text-gray-dark': type === 'white',
        'bg-[#f9f5ff]/10': type === 'blur',
        'p-0 sm:p-0': type === 'image',
        'rounded-sm-4-vw p-sm-4-vw sm:rounded-xl-6 sm:p-6': size === 'm',
        'rounded-sm-6-vw p-sm-4-vw sm:rounded-xl-10 sm:p-8': size === 'l',
        'rounded-sm-4-vw p-sm-4-vw sm:rounded-10 sm:p-10': size === 'xl',
        'rounded-sm-4-vw p-sm-4-vw sm:rounded-10 sm:p-14': size === 'xxl',
      })}
    >
      {children}
    </div>
  );
}
