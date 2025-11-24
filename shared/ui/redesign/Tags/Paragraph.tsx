import { clsx } from 'clsx';
import { CSSProperties, ReactNode } from 'react';

import { getSpaces } from '@/shared/lib/typograf';

import styles from './Paragraph.module.scss';

type VariantsType = 'small' | 'medium' | 'large' | 'body';

type FontColorsType = 'primary' | 'secondary' | 'tertiary';

interface ParagraphPropsType
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: string | ReactNode;
  variant: VariantsType;
  color?: FontColorsType;
  textOverflow?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const Paragraph = ({
  variant,
  color = 'primary',
  children,
  className,
  textOverflow,
  style,
}: ParagraphPropsType) => {
  return (
    <p
      style={style}
      className={clsx(
        styles[variant],
        styles[color],
        textOverflow && styles['text-overflow'],
        className,
      )}
    >
      {typeof children === 'string' ? getSpaces(children) : children}
    </p>
  );
};
