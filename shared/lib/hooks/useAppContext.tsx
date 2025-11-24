import { Context, useContext } from 'react';

export const useAppContext = <T,>(context: Context<T>) => {
  const data = useContext(context);

  if (!data) {
    throw new Error('Components must be wrapped');
  }

  return data;
};
