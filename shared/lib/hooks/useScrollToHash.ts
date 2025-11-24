import { useEffect } from 'react';

export function useScrollToHash(
  isReady: boolean,
  waitTime = 0,
  position: ScrollLogicalPosition = 'start',
) {
  useEffect(() => {
    if (isReady) {
      if (window.location.hash) {
        const targetElement = document.getElementById(
          window.location.hash.substring(1),
        );
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: position,
            });
          }, waitTime);
        }
      }
    }
  }, [isReady, waitTime, position]);
}
