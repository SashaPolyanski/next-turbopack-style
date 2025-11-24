'use client';

import 'swiper/css';

import { clsx } from 'clsx';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperCore } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { AutoplayOptions, SwiperOptions } from 'swiper/types';

import { useIsVisibleOnce } from '@/shared/lib/hooks';

import { Typography } from '../typography';
import styles from './CarouselSwiper.module.scss';
import {
  NextButton as DefaultNextButton,
  PrevButton as DefaultPrevButton,
} from './CarouselSwiperButtons';

const defaultBreakpoints: SwiperOptions['breakpoints'] = {
  1024: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 1.1,
    spaceBetween: 12,
  },
};

const defaultAutoplay: AutoplayOptions = {
  delay: 4,
  disableOnInteraction: false,
};

const DEFAULT_SPEED: number = 600;

type Variant = 'primary' | 'secondary' | 'whitePrimaryConst';

interface CarouselSwiperProps {
  className?: string;
  title?: string;
  slides: Array<React.ReactNode>;
  options?: Omit<SwiperOptions, 'breakpoints' | 'speed'>;
  speed?: number;
  autoplay?: AutoplayOptions | false;
  breakpoints?: SwiperOptions['breakpoints'];
  withPagination?: boolean;
  bulletsVariant?: 'primary' | 'secondary' | 'whitePrimaryConst';
  withControls?: boolean;
  withOverflowOnMobile?: boolean;
  overflowVisibleForce?: boolean;
  variant?: Variant;
  loop?: boolean;
  spaceBetween?: number;
  onClick?: MouseEventHandler<HTMLElement>;
  PrevButton?: typeof DefaultPrevButton;
  NextButton?: typeof DefaultNextButton;
  titleClassName?: string;
  controlsClassName?: string;
  onSlideChange?: (swiper: SwiperCore) => void;
}
export const CarouselSwiper = ({
  className,
  title,
  slides,
  options,
  breakpoints = defaultBreakpoints,
  speed,
  autoplay = false,
  withPagination = false,
  bulletsVariant = 'primary',
  spaceBetween,
  withControls = true,
  withOverflowOnMobile = false,
  overflowVisibleForce = false,
  loop = false,
  variant = 'primary',
  titleClassName = '',
  controlsClassName,
  onClick,
  PrevButton = DefaultPrevButton,
  NextButton = DefaultNextButton,
  onSlideChange,
}: CarouselSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisibleOnce(ref, true);

  useEffect(() => {
    if (withPagination && swiperRef.current?.swiper && paginationRef.current) {
      const { swiper } = swiperRef.current;

      if (
        swiper.params.pagination &&
        typeof swiper.params.pagination !== 'boolean'
      ) {
        swiper.params.pagination.el = paginationRef.current;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      }
    }
  }, [withPagination]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!swiperRef.current || !isVisible) return;

      const { swiper } = swiperRef.current;

      if (e.key === 'ArrowLeft') {
        swiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        swiper.slideNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const progressDuration = autoplay ? autoplay.delay : defaultAutoplay.delay;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div
      ref={ref}
      onClick={onClick}
      className={clsx(styles.wrapper, className)}
      role="button"
    >
      <div className={clsx(styles.header, titleClassName)}>
        {title && (
          <Typography
            variant="display"
            colors={variant || 'primary'}
            tag="h3"
          >
            {title}
          </Typography>
        )}
        {withControls && (
          <div className={clsx(styles.controls, controlsClassName)}>
            <PrevButton
              colors={variant || 'primary'}
              className={variant === 'secondary' ? styles.secondary : ''}
              disabled={!options?.loop && isBeginning}
              onClick={() =>
                swiperRef.current && swiperRef.current.swiper.slidePrev()
              }
            />
            <NextButton
              colors={variant || 'primary'}
              className={variant === 'secondary' ? styles.secondary : ''}
              disabled={!options?.loop && isEnd}
              onClick={() =>
                swiperRef.current && swiperRef.current.swiper.slideNext()
              }
            />
          </div>
        )}
      </div>
      <div
        className={clsx(
          styles.swiperWrapper,
          withOverflowOnMobile && styles.overflowOnMobile,
          overflowVisibleForce && styles.overflowVisibleForce,
        )}
      >
        <Swiper
          spaceBetween={spaceBetween}
          speed={speed || DEFAULT_SPEED}
          autoplay={slides.length > 1 ? autoplay : false}
          loop={loop}
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          className={clsx(
            styles.swiper,
            withOverflowOnMobile && styles.overflow,
            overflowVisibleForce && styles.overflowVisibleForce,
          )}
          pagination={
            withPagination && slides.length > 1
              ? {
                  el: paginationRef.current,
                  clickable: true,
                  bulletClass: clsx(
                    styles.bullet,
                    variant === 'secondary' && styles.bulletSecondary,
                  ),
                  bulletActiveClass: clsx(
                    styles.bulletActive,
                    variant === 'secondary' && styles.bulletActiveSecondary,
                  ),
                }
              : false
          }
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            onSlideChange?.(swiper);
          }}
          {...options}
          breakpoints={breakpoints}
        >
          {slides.map((children, index) => (
            <SwiperSlide
              key={index}
              className={styles.slide}
            >
              {children}
            </SwiperSlide>
          ))}
        </Swiper>
        {withPagination && slides.length > 1 && (
          <div
            ref={paginationRef}
            style={
              {
                '--progress-duration': `${progressDuration}ms`,
              } as React.CSSProperties
            }
            className={clsx(
              styles.pagination,
              bulletsVariant === 'secondary' && styles.paginationSecondary,
            )}
          />
        )}
      </div>
    </div>
  );
};
