import Link from 'next/link';
import React from 'react';

import { cn } from '../../../lib/tailwind-merge';
import { CustomLinkProps, SIZE } from '../lib/types';

const SIZE_CLASSES: Record<SIZE, string> = {
  min: 'text-sm-min-s-vw',
  s: 'text-sm-s',
  m: 'text-sm-ls',
  l: 'text-sm-1xl',
};

export const LinkCustom = ({
  size = 'm',
  className,
  ...props
}: CustomLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(SIZE_CLASSES[size], 'text-violet-light', className)}
    />
  );
};
