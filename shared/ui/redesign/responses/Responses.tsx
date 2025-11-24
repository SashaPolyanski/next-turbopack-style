import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { PropsWithHtmlAttributes } from '../../../lib/types/props-with-html-attributes';
import { Typography } from '../../typography';
import styles from './Responses.module.scss';

export type ResponsesProps = PropsWithHtmlAttributes<
  {
    description?: React.ReactNode;
    image: StaticImageData;
    actions?: React.ReactNode;
    children?: never;
    imageClassName?: string;
    title?: string;
  },
  HTMLDivElement
>;

export const Responses = React.forwardRef<HTMLDivElement, ResponsesProps>(
  (props, ref) => {
    const { className, description, title, image, imageClassName } = props;

    return (
      <div
        className={clsx(styles.wrapper, className)}
        ref={ref}
      >
        <Image
          src={image}
          alt="Картинка ошибки"
          className={imageClassName}
        />
        <div className={styles.info}>
          {title && (
            <Typography
              variant="title1"
              className={styles.title}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="action"
              className={styles.description}
            >
              {description}
            </Typography>
          )}
        </div>
      </div>
    );
  },
);
