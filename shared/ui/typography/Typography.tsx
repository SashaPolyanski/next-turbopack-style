import { PropsWithChildren } from 'react';

import { getSpaces } from '@/shared/lib/typograf';

export const Typography = ({ children, ...props }: PropsWithChildren<any>) => {
  return (
    <p {...props}>
      {typeof children === 'string' ? getSpaces(children) : children}
    </p>
  );
};
