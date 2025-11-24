import { StaticImageData } from 'next/image';
import React from 'react';

import { Responses, ResponsesProps } from './Responses';

type CreateResponsesArguments = {
  image: StaticImageData;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  imageClassName?: string;
  title?: string;
};

export function createResponses({
  image,
  description,
  actions,
  imageClassName,
  title,
}: CreateResponsesArguments) {
  return React.forwardRef<HTMLDivElement, Omit<ResponsesProps, 'image'>>(
    (props, ref) => {
      return (
        <Responses
          ref={ref}
          description={props.description || description}
          actions={props.actions || actions}
          image={image}
          title={title}
          imageClassName={imageClassName}
          {...props}
        />
      );
    },
  );
}
