import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SkeletonTeacher({ classes, light = false }: any) {
  return (
    <div
      role="status"
      className="grid grid-cols-[14vw_1fr] gap-sm-3-vw sm:grid-cols-[80px_1fr] sm:gap-4"
    >
      <div
        className={clsx(
          classes,
          {
            'bg-gray-extra-light': light,
          },
          'size-sm-12-vw animate-pulse rounded-full bg-black opacity-75 sm:size-[80px]',
        )}
      />
      <div className="flex flex-col md:w-3/5">
        <div
          className={clsx(
            classes,
            {
              'bg-gray-extra-light': light,
            },
            'my-sm-1-vw h-sm-4-vw w-sm-18-vw animate-pulse rounded-full bg-black opacity-75 sm:my-4 sm:mb-2 sm:h-4 sm:w-18',
          )}
        />
        <div
          className={clsx(
            classes,
            {
              'bg-gray-extra-light': light,
            },
            'mb-sm-2-vw h-sm-4-vw w-[60vw] animate-pulse rounded-full bg-black opacity-75 sm:mb-2 sm:h-4 sm:w-[230px]',
          )}
        />
      </div>
    </div>
  );
}
