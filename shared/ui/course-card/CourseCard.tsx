import { clsx } from 'clsx';

interface ICourseCard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bottom?: any;
  mode?: 'dark' | 'light';
  classBody?: string;
  classCard?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

export function CourseCard({
  children,
  bottom = '',
  mode = 'light',
  classBody = '',
  classCard = '',
  ...rest
}: ICourseCard) {
  return (
    <div
      className={clsx(
        classCard,
        {
          'bg-white': mode === 'light',
          'bg-gray-dark': mode === 'dark',
        },
        'light-wrapper-card rounded-sm-4-vw sm:rounded-lg',
        'overflow-hidden',
        'p-[24px] sm:p-8',
        'gap-6',
        'min-h-[160px] sm:min-h-[200px]',
        'grid',
        'relative content-between',
      )}
      {...rest}
    >
      <div className={clsx(classBody, 'grid grid-cols-1 gap-sm-4-vw sm:gap-4')}>
        {children}
      </div>
      <div>{bottom}</div>
    </div>
  );
}
