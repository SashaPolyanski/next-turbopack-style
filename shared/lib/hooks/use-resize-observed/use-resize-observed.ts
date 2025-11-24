import React, { RefObject, useLayoutEffect } from 'react';

export const useResizeObserved = <
  Element extends HTMLElement | SVGGraphicsElement,
  ReturnType,
>(
  refs: Array<RefObject<Element>>,
  mapper: (el: Element | null) => ReturnType,
): Array<ReturnType> => {
  const [dimensions, setDimensions] = React.useState<Array<ReturnType>>(() =>
    refs.map((ref) => mapper(ref.current)),
  );

  // Храним маппер в рефке, чтобы если его передадут инлайн-функцией, это не вызвало бесконечные перерендеры
  const mapperRef = React.useRef(mapper);
  useLayoutEffect(() => {
    mapperRef.current = mapper;
  }, [mapper]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setDimensions(refs.map((ref) => mapperRef.current(ref.current)));
    });

    refs.forEach((ref) => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [refs]);

  return dimensions;
};
