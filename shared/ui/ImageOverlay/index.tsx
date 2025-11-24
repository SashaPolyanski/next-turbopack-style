'use client';

import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useLockDocument } from '@/shared/lib/hooks/useLockDocument';

import { useGlobalKeys } from '../../lib/hooks/use-global-keys';
import { AnimationButtonCross } from '../animation-button-cross';
import styles from './ImageOverlay.module.scss';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
}) => {
  const ref = useRef(null);
  const handleClickImage = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    event.stopPropagation();
  };

  useGlobalKeys({
    Escape: () => isOpen && onClose(),
  });

  useLockDocument(isOpen);

  return (
    <CSSTransition
      nodeRef={ref}
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.overlayEnter,
        enterActive: styles.overlayEnterActive,
        exit: styles.overlayExit,
        exitActive: styles.overlayExitActive,
      }}
      unmountOnExit
    >
      <div
        ref={ref}
        onKeyDown={onClose}
        className={styles.overlay}
        onClick={onClose}
      >
        <div className={styles.content}>
          <div className={styles.wrapperIcon}>
            <AnimationButtonCross
              className={styles.icon}
              onClick={onClose}
            />
          </div>

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <img
            onClick={handleClickImage}
            src={src}
            alt={alt || 'Картинка контента'}
            className={styles.image}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
