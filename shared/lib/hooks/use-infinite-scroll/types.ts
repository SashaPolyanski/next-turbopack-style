import { MutableRefObject } from 'react';

export type InfiniteScroll = {
  callback: () => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  wrapperRef: MutableRefObject<HTMLElement | null>;
  rootMargin?: string;
};
