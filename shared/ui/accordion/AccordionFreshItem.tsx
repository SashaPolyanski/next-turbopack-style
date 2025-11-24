'use client';

import { clsx } from 'clsx';
import { ReactElement, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MinusIcon } from '@/shared/ui/svg';

interface IAccordionFreshItem {
  children?: string | ReactNode | ReactElement;
  title?: string | ReactNode | ReactElement;
  className?: string;
  onClick?: (open: boolean) => void;
}

export function AccordionFreshItem({
  children,
  title,
  className,
  onClick,
}: IAccordionFreshItem) {
  const id = uuidv4();
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    if (onClick) onClick(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        className,
        'text-sm-ls-vw sm:text-m',
        'group peer block transition-all duration-300 ease-in',
        'cursor-pointer',
      )}
    >
      <input
        id={id}
        checked={isChecked}
        type="checkbox"
        className="peer hidden"
        onChange={checkHandler}
      />
      <label
        htmlFor={id}
        className="group relative flex cursor-pointer content-center items-center justify-between text-sm-1xl-vw font-medium text-gray-dark sm:text-l"
      >
        {title}
        <div className="min-h-sm-8-vw min-w-sm-8-vw self-center sm:min-h-10 sm:min-w-10">
          <MinusIcon className="absolute size-sm-8-vw rotate-90 fill-gray-dark transition-all group-hover:fill-gray-dark peer-checked:rotate-0 group-peer-checked:rotate-0 sm:size-10" />
          <MinusIcon className="group-hover:fill-black-80 size-sm-8-vw fill-gray-dark sm:size-10" />
        </div>
      </label>
      <div className="accordioncontent flex max-h-0 flex-col gap-sm-3-vw overflow-hidden text-sm-ls-vw text-gray-dark opacity-0 transition-all duration-300 ease-in peer-checked:max-h-fit peer-checked:pt-sm-2-vw peer-checked:opacity-100 sm:gap-3 sm:text-sh peer-checked:sm:pt-3">
        {children}
      </div>
    </label>
  );
}
