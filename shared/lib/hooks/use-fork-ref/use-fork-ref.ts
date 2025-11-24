import { useMemo } from 'react';

import { setRef } from './set-ref';

const forkRef = <T>(
  refs: Array<React.Ref<T> | undefined>,
): React.RefCallback<T> | null => {
  if (!refs.length) {
    return null;
  }
  return (refValue) => {
    refs.forEach((ref) => {
      setRef(ref as React.MutableRefObject<T>, refValue);
    });
  };
};

export const useForkRef = <T>(refs: Array<React.Ref<T> | undefined>) =>
  useMemo(() => forkRef(refs), [refs]);
