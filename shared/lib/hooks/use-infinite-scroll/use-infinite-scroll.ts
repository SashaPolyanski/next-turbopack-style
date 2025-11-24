'use client';

import { useEffect } from 'react';

import { InfiniteScroll } from './types';

export const useInfiniteScroll = ({
  triggerRef,
  wrapperRef,
  callback,
  rootMargin = '0px',
}: InfiniteScroll): InfiniteScroll | null => {
  useEffect(() => {
    if (!triggerRef || !wrapperRef || !callback) {
      return;
    }

    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    const options = {
      root: wrapperElement,
      rootMargin,
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (triggerElement) {
      observer.observe(triggerElement);
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef, rootMargin]);

  return {
    triggerRef,
    wrapperRef,
    callback,
  };
};
