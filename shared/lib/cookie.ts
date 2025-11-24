import { cookies } from 'next/headers';

import { COOKIE_KEY } from '@/shared/lib/constants/cookie';

export async function getLocationCookie(): Promise<any> {
  const store = await cookies();

  return {
    flag: decodeURIComponent(
      store.get(COOKIE_KEY.LOCALE_COUNTRY_IMAGE)?.value || '',
    ),
    phoneCode: decodeURIComponent(
      store.get(COOKIE_KEY.LOCALE_PHONE_CODE)?.value || '',
    ),
    code: decodeURIComponent(store.get(COOKIE_KEY.LOCALE)?.value || ''),
    country: decodeURIComponent(
      store.get(COOKIE_KEY.LOCALE_COUNTRY)?.value || '',
    ),
    placeholder: decodeURIComponent(
      store.get(COOKIE_KEY.LOCALE_PLACEHOLDER)?.value || '',
    ),
  };
}
