import Link from 'next/link';
import { ComponentProps } from 'react';

export type SIZE = 'min' | 's' | 'm' | 'l';

export interface CustomLinkProps extends ComponentProps<typeof Link> {
  size?: SIZE;
}
