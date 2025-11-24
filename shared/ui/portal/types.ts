import { ReactNode } from 'react';

export type PortalProps = {
  children: ReactNode;
  propElement?: Node;
  propIdNameElement?: string;
};
