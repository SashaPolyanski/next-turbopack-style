import React from 'react';

import { cn } from '../../lib/tailwind-merge';
import { CrossIcon } from '../svg';

type AnimationIconCrossProps = {
  onClick?: () => void;
  className?: string;
};

export const AnimationButtonCross = ({
  onClick,
  className,
}: AnimationIconCrossProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      <CrossIcon
        fill="black"
        className={cn(
          'fill-gray-light hover:fill-gray active:fill-gray-dark',
          className,
        )}
      />
    </button>
  );
};
