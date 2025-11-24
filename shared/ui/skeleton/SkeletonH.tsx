import clsx from 'clsx';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SkeletonH({ classes, light = false }: any) {
  return (
    <div className="flex flex-col gap-sm-2-vw sm:gap-3">
      <div
        role="status"
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'mb-6-vw w-1/3 animate-pulse rounded-sm-3-vw bg-black p-sm-4-vw opacity-75 sm:mb-6 sm:rounded-xl-3 sm:p-4',
        )}
      />
      <div
        role="status"
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'mb-5-vw w-2/3 animate-pulse rounded-sm-3-vw bg-black p-sm-3-vw opacity-75 sm:mb-5 sm:rounded-xl-3 sm:p-3',
        )}
      />
    </div>
  );
}
