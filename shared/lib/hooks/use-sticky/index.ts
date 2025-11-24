import { MutableRefObject, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { throttle } from '@/shared/lib/throttled';

type UseStickyResult = {
  isSticky: boolean;
  ref: MutableRefObject<HTMLDivElement | null>;
};

const DELAY = 20;

export const useSticky = (): UseStickyResult => {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (elementRef?.current?.clientHeight) {
      const value =
        document.documentElement.scrollTop + document.body.scrollTop >=
        elementRef.current.clientHeight;
      setIsSticky(value);
    }
  };

  useEventListener('scroll', throttle(handleScroll, DELAY));

  return { isSticky, ref: elementRef };
};
