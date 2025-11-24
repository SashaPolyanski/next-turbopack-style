'use client';

import './styles.css';

import { clsx } from 'clsx';
import { useState } from 'react';

import { getSpaces } from '@/shared/lib/typograf';
import { LinePlusIcon } from '@/shared/ui/svg';

interface IItem {
  title?: string;
  content?: string;
}

export function Item({ content = '', title = '' }: IItem) {
  const [open, setOpen] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      data-theme={title}
      onClick={() => setOpen(!open)}
      className={clsx(
        {
          'bg-white': open,
          'bg-gray-dark': !open,
        },
        'accordion group cursor-pointer overflow-hidden rounded-sm-3-vw p-sm-3-vw text-sm-ls-vw transition-colors duration-300 ease-in sm:rounded-sm sm:p-4 sm:p-6 sm:text-m',
      )}
    >
      <div className="relative flex content-center items-center justify-between">
        <p
          className={clsx(
            {
              'text-black group-hover:opacity-75 group-active:opacity-50': open,
              'text-white group-hover:opacity-75 group-active:opacity-50':
                !open,
            },
            'text-sm-l-vw font-medium text-black sm:text-m',
          )}
          dangerouslySetInnerHTML={{
            __html: getSpaces(title),
          }}
        />
        <div className="min-h-sm-6-vw min-w-sm-6-vw self-center sm:min-h-6 sm:min-w-6">
          <LinePlusIcon
            className={clsx(
              {
                'rotate-0 fill-black group-hover:opacity-75 group-active:opacity-50':
                  open,
                'rotate-90 fill-white group-hover:opacity-75 group-active:opacity-50':
                  !open,
              },
              'absolute size-sm-6-vw transition-all sm:size-6',
            )}
          />
          <LinePlusIcon
            className={clsx(
              {
                'fill-black group-hover:opacity-75 group-active:opacity-50':
                  open,
                'fill-white group-hover:opacity-75 group-active:opacity-50':
                  !open,
              },
              'size-sm-6-vw sm:size-6',
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          {
            'open pt-sm-3-vw text-sm-l-vw text-gray sm:pt-6 sm:text-m': open,
          },
          'accordion-body layout list-layout gap-sm-3-vw font-normal sm:gap-3',
        )}
        dangerouslySetInnerHTML={{
          __html: getSpaces(content),
        }}
      />
    </div>
  );
}
