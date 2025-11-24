export type PropsWithHtmlAttributes<Props, HTMLElement> = Props &
  Omit<React.HTMLAttributes<HTMLElement>, keyof Props | 'css'>;

export type PropsWithHTMLAttributesAndRef<Props, HTMLElement> =
  PropsWithHtmlAttributes<React.PropsWithoutRef<Props>, HTMLElement> &
    React.RefAttributes<HTMLElement>;
