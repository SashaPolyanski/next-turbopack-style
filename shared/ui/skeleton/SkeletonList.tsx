import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SkeletonList({ classes, light = false }: any) {
  return (
    <div className="flex flex-col gap-sm-2-vw sm:gap-3">
      <div
        role="status"
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'animate-pulse rounded-sm-3-vw bg-black p-sm-5-vw opacity-75 sm:rounded-xl-3 sm:p-9',
        )}
      />
      <div
        role="status"
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'animate-pulse rounded-sm-3-vw bg-black p-sm-5-vw opacity-75 sm:rounded-xl-3 sm:p-9',
        )}
      />
      <div
        role="status"
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'animate-pulse rounded-sm-3-vw bg-black p-sm-5-vw opacity-75 sm:rounded-xl-3 sm:p-9',
        )}
      />
    </div>
  );
}
