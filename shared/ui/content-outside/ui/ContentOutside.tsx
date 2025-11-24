'use client';

import { clsx } from 'clsx';
import React, { useState } from 'react';

import { useAnalytics } from '@/shared/lib/hooks/use-analytics';
import { ImageModal } from '@/shared/ui/ImageOverlay';

type ContentOutsideProps = {
  content: string;
  className?: string;
  analyticsParams?: Record<string, string>;
};

type MouseOrKeyboardEvent =
  | React.MouseEvent<HTMLElement>
  | React.MouseEvent<HTMLImageElement>
  | React.KeyboardEvent<HTMLElement>;

export const ContentOutside = ({
  content,
  className,
  analyticsParams,
}: ContentOutsideProps) => {
  const { track } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const handleClick = (event: MouseOrKeyboardEvent) => {
    const element = event?.target as HTMLElement;
    if (element.tagName === 'A') {
      const href = element.getAttribute('href');

      if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      track('Link', {
        action: 'click',
        params: {
          link_name: element.textContent,
          analyticsParams,
        },
      });
    }

    if (element.tagName === 'IMG' && (element as HTMLImageElement).src) {
      setImageSrc((element as HTMLImageElement).src);
      setIsOpen(true);
    }
  };

  const handleCloseImage = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        onKeyDown={handleClick}
        className={clsx('contentOutside', className)}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <ImageModal
        isOpen={isOpen}
        onClose={handleCloseImage}
        src={imageSrc}
      />
    </>
  );
};
