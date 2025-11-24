export function parseCookies(cookieString: string) {
  return cookieString.split('; ').reduce(
    (cookies, cookie) => {
      const [key, value] = cookie.split('=');
      cookies[key] = decodeURIComponent(value);
      return cookies;
    },
    {} as Record<string, string>,
  );
}
