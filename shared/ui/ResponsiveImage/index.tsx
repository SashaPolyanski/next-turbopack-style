import Image, { ImageProps } from 'next/image';

import styles from './ResponsiveImage.module.scss';

type ResponsiveImageProps = Omit<ImageProps, 'width' | 'height'> & {
  className?: string;
};

export const ResponsiveImage = ({
  className = '',
  alt,
  ...props
}: ResponsiveImageProps) => {
  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <Image
        {...props}
        alt={alt}
        fill
      />
    </div>
  );
};
