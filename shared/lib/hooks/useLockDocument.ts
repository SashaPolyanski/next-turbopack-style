'use client';

import { useEffect } from 'react';

export function useLockDocument(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [isLocked]);
}
