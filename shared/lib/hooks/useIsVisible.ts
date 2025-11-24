'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useIsVisibleOnce<T extends Element>(
  ref: MutableRefObject<T | null>,
  ever: boolean = false,
) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    if (ref?.current) {
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (!ever && !hasBeenVisible.current) {
            hasBeenVisible.current = true;
            observer.current?.disconnect();
          }
        } else if (ever) {
          setIntersecting(false);
        }
      });

      observer.current.observe(ref?.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [ref, ever]);

  return isIntersecting;
}
