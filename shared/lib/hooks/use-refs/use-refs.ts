import { createRef, useMemo } from 'react';

const isNotNumber = <T>(value: T): value is Exclude<T, number> =>
  typeof value !== 'number';

type Return<T, E extends number | Array<string> | ReadonlyArray<string>> =
  E extends Array<string>
    ? Record<E[number], React.RefObject<T>>
    : E extends ReadonlyArray<string>
      ? Record<E[number], React.RefObject<T>>
      : Array<React.RefObject<T>>;

export const useRefs = <
  T,
  E extends number | Array<string> | ReadonlyArray<string> = number,
>(
  elements: E,
  deps: Array<unknown> = [],
): Return<T, E> =>
  useMemo(() => {
    if (isNotNumber(elements)) {
      const obj: Record<string, React.RefObject<T>> = {};
      for (let index = 0; index < elements.length; index++) {
        // @ts-ignore
        obj[elements[index]] = createRef<T>();
      }

      return obj as Return<T, E>;
    }

    return new Array(elements as number)
      .fill(null)
      .map(() => createRef<T>()) as unknown as Return<T, E>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof elements === 'number' ? elements : elements.join('-'), ...deps]);
