'use client';

import { PropsWithChildren } from 'react';

import {
  TrackOptions,
  TrackType,
  useAnalytics,
} from '@/shared/lib/hooks/use-analytics';

interface TrackEventPropsBase extends PropsWithChildren {
  as?: React.FunctionComponent<any> | string;
  onClick?: () => void;
  options: TrackOptions;
  sendAfterVisible?: boolean;
  skip?: boolean;
  prefetch?: boolean;
  [key: string]: any;
}

interface TrackEventPropsWithType extends TrackEventPropsBase {
  type: TrackType;
  sendOnFirstVisitOnly?: never;
}

interface TrackEventPropsWithSendOnFirstVisitOnly extends TrackEventPropsBase {
  sendOnFirstVisitOnly: boolean;
  type?: never;
}

type TrackEventProps =
  | TrackEventPropsWithType
  | TrackEventPropsWithSendOnFirstVisitOnly;

export const TrackElement = ({
  as: Component = 'div',
  children,
  onClick,
  type,
  options,
  prefetch,
  sendAfterVisible = false,
  sendOnFirstVisitOnly = false,
  skip,
  ...props
}: TrackEventProps) => {
  const { track, ref } = useAnalytics({
    sendOnFirstVisitOnly,
    sendAfterVisible,
    type,
    skip,
    params: options?.params ? { ...options?.params } : {},
  });

  const handleClick = () => {
    if (options.action === 'click' && type) {
      track(type, options);
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <Component
      ref={ref}
      prefetch={prefetch}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
};
