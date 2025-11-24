import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { cn } from '../../lib/tailwind-merge';
import { PropsWithHtmlAttributes } from '../../lib/types/props-with-html-attributes';

export type ResponsesProps = PropsWithHtmlAttributes<
  {
    variant?: 'primary' | 'secondary';
    description?: React.ReactNode;
    image: StaticImageData;
    actions?: React.ReactNode;
    children?: never;
    imageClassName?: string;
  },
  HTMLDivElement
>;

export const Responses = React.forwardRef<HTMLDivElement, ResponsesProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      className,
      description,
      image,
      imageClassName,
    } = props;

    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-sm-2-vw sm:gap-3',
          className,
        )}
        ref={ref}
      >
        <div className="flex max-w-[550px] flex-col items-center justify-center gap-sm-2-vw sm:gap-3">
          <Image
            src={image}
            alt="картинка с ошибками"
            className={imageClassName}
          />
          {description && (
            <p
              className={cn(
                'text-sm-1xl-vw font-medium sm:text-1xl',
                variant === 'primary' ? 'text-black' : 'text-white',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);
