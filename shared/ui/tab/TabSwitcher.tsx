import { Fragment } from 'react/jsx-runtime';

import { Switcher } from './Switcher';

interface ITabSwitcher {
  select?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabs?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick?: (e: any, id: number) => void;
}

export function TabSwitcher({
  select = 2,
  handleClick = () => {},
  tabs = [],
}: ITabSwitcher) {
  return (
    <Fragment>
      <Switcher
        select={select}
        handleClick={handleClick}
      />
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {tabs.map((tab: any, id: number) => (
          <div
            key={id}
            className={select === id + 1 ? 'block' : 'hidden'}
          >
            {tab}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
