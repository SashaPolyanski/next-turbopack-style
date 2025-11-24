import clsx from 'clsx';

import { InfoBlock } from '../info-block';

export function SkeletonBigVarticalCard({
  light = false,
  size = 'l',
}: {
  light?: boolean;
  size?: 'l' | 'm';
}) {
  return (
    <InfoBlock
      type={light ? 'white' : 'black'}
      size={size}
      className="opacity-7 animate-pulse"
    >
      <div className="flex items-center justify-between">
        <div>
          <div
            className={clsx(
              {
                'bg-gray-dark': !light,
                'bg-gray-extra-light': light,
              },
              'mb-2.5 h-4 w-24 rounded-full',
            )}
          />
          <div
            className={clsx(
              {
                'bg-gray-dark': !light,
                'bg-gray-extra-light': light,
              },
              'h-5 w-32 rounded-full',
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          {
            'bg-gray-dark': !light,
            'bg-gray-extra-light': light,
          },
          'my-8 mb-2.5 h-4 rounded-full',
        )}
      />
      <div
        className={clsx(
          {
            'bg-gray-dark': !light,
            'bg-gray-extra-light': light,
          },
          'mb-2.5 h-4 rounded-full',
        )}
      />
      <div
        className={clsx(
          {
            'bg-gray-dark': !light,
            'bg-gray-extra-light': light,
          },
          'mb-10 h-4 rounded-full',
        )}
      />
      <div className="mt-4 flex items-center" />
    </InfoBlock>
  );
}
