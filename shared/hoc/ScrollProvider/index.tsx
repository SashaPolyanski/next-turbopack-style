'use client';

/**
 * @file Модуль для управления скроллом внутри контейнера.
 * Предоставляет контекст и хуки для плавного скролла к элементам по ID.
 */

import { isSafari } from '@floating-ui/react/utils';
import { createContext, useRef } from 'react';

import { useAppContext } from '@/shared/lib/hooks';

type ScrollContextType = {
  scrollToId: (id: string, block?: ScrollLogicalPosition) => void;
  scrollToIdWithOffset: (id: string, offset?: number) => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScroll = () => {
  return useAppContext(ScrollContext);
};

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Плавный скролл к элементу на Safari
  const scrollToIdWithOffset = (id: string, offset: number = 0) => {
    if (!containerRef.current) return;
    const element = containerRef.current.querySelector(`#${id}`);

    if (element instanceof HTMLElement) {
      const startPosition = window.pageYOffset;
      const elementPosition =
        element.getBoundingClientRect().top + startPosition;
      const targetPosition = elementPosition - offset;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();
      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / 300, 1);
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - (-2 * progress + 2) ** 2 / 2;

        window.scrollTo(0, startPosition + distance * ease);
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      requestAnimationFrame(animateScroll);
    }
  };

  const scrollToId = (id: string, block: ScrollLogicalPosition = 'nearest') => {
    if (!containerRef.current) return;
    const element = containerRef.current.querySelector(`#${id}`);
    if (element instanceof HTMLElement) {
      if (!isSafari()) {
        element.scrollIntoView({
          behavior: 'smooth',
          block,
        });
      } else {
        scrollToIdWithOffset(id);
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToId, scrollToIdWithOffset }}>
      <div ref={containerRef}>{children}</div>
    </ScrollContext.Provider>
  );
};
