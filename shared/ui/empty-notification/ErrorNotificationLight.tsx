import clsx from 'clsx';
import { ReactNode } from 'react';

import { InfoBlock } from '../info-block';

export function ErrorNotificationLight({
  title,
  description,
  className,
}: {
  title: string;
  description: string | ReactNode;
  className?: string;
}) {
  return (
    <InfoBlock className={clsx(className, 'flex flex-col gap-3')}>
      <h3 className="text-sm-1xl-vw text-gray-dark sm:text-l max-w-sm:w-[70%]">
        {title}
      </h3>
      <p className="text-sm-ls-vw text-gray-dark sm:text-sh max-w-sm:w-[70%]">
        {description}
      </p>
    </InfoBlock>
  );
}
