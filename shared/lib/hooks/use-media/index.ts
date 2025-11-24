import { useMediaQuery } from 'usehooks-ts';

import { MEDIA } from '../../constants/media';

export const useMedia = () => {
  const isDesktop = useMediaQuery(MEDIA.SM, {
    initializeWithValue: false,
  });

  return { isDesktop };
};
