import { useMemo } from 'react';

import { useResizeObserved } from '../use-resize-observed';
import { getElementSize } from './get-element-size';
import { ComponentSize } from './types';

export function useComponentSize(
  ref: React.RefObject<HTMLElement | SVGGraphicsElement>,
): ComponentSize {
  const refs = useMemo(
    () => [ref],
    // Если реф начал указывать на другой элемент, нужно обновить подписки
    [ref],
  );
  return useResizeObserved(refs, getElementSize)[0];
}
