import { StaticImageData } from 'next/image';
import React from 'react';

import { Responses, ResponsesProps } from './Responses';

type CreateResponsesArguments = {
  variant?: 'primary' | 'secondary';
  image: StaticImageData;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  imageClassName?: string;
};

export function createResponses({
  variant = 'primary',
  image,
  description,
  actions,
  imageClassName,
}: CreateResponsesArguments) {
  return React.forwardRef<HTMLDivElement, Omit<ResponsesProps, 'image'>>(
    (props, ref) => {
      return (
        <Responses
          variant={variant}
          ref={ref}
          description={props.description || description}
          actions={props.actions || actions}
          image={image}
          imageClassName={imageClassName}
          {...props}
        />
      );
    },
  );
}
