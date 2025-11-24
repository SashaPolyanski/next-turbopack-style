'use client';

import { Placement } from '@floating-ui/react';
import { ReactElement, ReactNode } from 'react';

import { AnimationButtonCross } from '../animation-button-cross';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../popover';
import { Button } from '../redesign';
import { IconShare } from '../svg';

export type ShareProps = {
  children: ReactNode;
  placement?: Placement;
  onClick?: () => void;
  trigger?: () => ReactElement;
};

export const Share = ({
  children,
  placement = 'bottom-end',
  onClick,
  trigger,
}: ShareProps) => {
  return (
    <Popover
      placement={placement}
      autoFocus={false}
      isFlip={false}
    >
      <PopoverTrigger
        asChild
        onClick={onClick}
      >
        {trigger ? (
          trigger()
        ) : (
          <Button
            view="clear"
            iconLeft={IconShare}
            onlyIcon
          />
        )}
      </PopoverTrigger>
      <PopoverContent className="relative rounded-sm-4-vw bg-white shadow-[0_0_12px_-4px_gray] sm:rounded-xl-6 max-w-sm:w-max">
        {children}
        <PopoverClose asChild>
          <AnimationButtonCross className="absolute right-sm-4-vw top-sm-4-vw size-sm-3-vw cursor-pointer fill-gray-light hover:fill-gray active:fill-gray-dark sm:right-6 sm:top-6 sm:size-4" />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
