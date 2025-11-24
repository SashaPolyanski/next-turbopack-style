'use client';

import Image, { ImageProps } from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { cn } from '@/shared/lib/tailwind-merge';
import { DATA_BLUR_URL } from '@/shared/ui/custom-image/lib/blur';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  className?: string;
}

export const CustomImage: FC<CustomImageProps> = ({
  src,
  className,
  width,
  height,
  alt = 'Картинка',
  ...props
}) => {
  const [image, setImage] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImage(src);
    setIsError(false);
  }, [src]);

  const handleError = () => {
    setIsError(true);
  };

  // для картинок с размерами меньше 40px - не грузим плейсхолдер
  const placeholder =
    width && height && (Number(width) > 40 || Number(height) > 40)
      ? 'blur'
      : 'empty';

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      src={image || src}
      onError={handleError}
      placeholder={placeholder}
      blurDataURL={DATA_BLUR_URL}
      className={cn(className, { 'bg-black object-fill': isError })}
      {...props}
    />
  );
};
