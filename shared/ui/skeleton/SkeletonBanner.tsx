import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SkeletonBanner({ classes, light = false }: any) {
  return (
    <div
      role="status"
      className={clsx(
        classes,
        {
          'bg-gray-extra-light': light,
        },
        'h-[40vw] animate-pulse rounded-sm-3-vw bg-black p-sm-5-vw opacity-75 sm:h-[200px] sm:rounded-xl-3 sm:p-9',
      )}
    />
  );
}
