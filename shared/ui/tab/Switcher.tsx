import { clsx } from 'clsx';
import { Fragment } from 'react/jsx-runtime';

import styles from './Switcher.module.scss';

interface ISwitcher {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  select?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick?: (e: any, id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

export function Switcher({
  children,
  select = 2,
  handleClick = () => {},
  ...props
}: ISwitcher) {
  return (
    <Fragment>
      <input
        className="hidden"
        name=""
      />

      <div
        {...props}
        className="relative grid h-sm-13-vw grid-cols-2 content-center rounded-sm-4-vw bg-[#2C2C2C] sm:h-17 sm:w-[418px] sm:rounded-xl-5"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <p
          className={clsx(
            select === 1 ? 'text-black' : 'text-white',
            'px-auto z-10 cursor-pointer py-sm-3-vw text-center text-sm-1xl-vw transition-all duration-300 ease-in-out sm:py-4 sm:text-ls',
          )}
          onClick={(e) => handleClick(e, 1)}
        >
          Вебинары
        </p>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <p
          className={clsx(
            select === 2 ? 'text-black' : 'text-white',
            'px-auto z-10 cursor-pointer py-sm-3-vw text-center text-sm-1xl-vw transition-all duration-300 ease-in-out sm:py-4 sm:text-ls',
          )}
          onClick={(e) => handleClick(e, 2)}
        >
          Мероприятия
        </p>

        <div
          className={clsx(
            {
              [styles.first]: select === 1,
              [styles.second]: select === 2,
            },
            'sm:left-xl-1 absolute left-sm-1-vw top-sm-1-vw z-0 h-sm-11-vw w-[50%] rounded-sm-3-vw bg-white text-center transition-all duration-300 ease-in-out sm:top-1 sm:h-15 sm:rounded-[18px]',
          )}
        />
      </div>
    </Fragment>
  );
}
