import {
  COOKIE_KEY,
  DEFAULT_COOKIES_CONFIG,
} from '@/shared/lib/constants/cookie';

export const setLocationCookie = (country: any) => {
  const cookieArray = [
    {
      name: COOKIE_KEY.LOCALE,
      value: country?.code,
    },
    {
      name: COOKIE_KEY.LOCALE_COUNTRY,
      value: country?.country,
    },
    {
      name: COOKIE_KEY.LOCALE_PHONE_CODE,
      value: country?.phoneCode,
    },
    {
      name: COOKIE_KEY.LOCALE_PLACEHOLDER,
      value: country?.placeholder,
    },
    {
      name: COOKIE_KEY.LOCALE_COUNTRY_IMAGE,
      value: country?.flag,
    },
  ];
  if (Array.isArray(cookieArray)) {
    cookieArray.forEach(({ name, value }) => {
      document.cookie = `${name}=${encodeURIComponent(value)}; ${Object.entries(
        DEFAULT_COOKIES_CONFIG,
      )
        .map(([key, val]) => `${key}=${val}`)
        .join('; ')}`;
    });
  }
};
