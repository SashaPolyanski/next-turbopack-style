const PRIVATE_ROUTES = ['test', 'admin'];

type IsPrivateUrlParams = { url?: string };

export const isPrivateUrl = ({ url }: IsPrivateUrlParams = {}): boolean => {
  let currentUrl = url;
  if (!currentUrl && typeof window !== 'undefined') {
    currentUrl = window.location.href;
  }

  return PRIVATE_ROUTES.some((path) => currentUrl?.includes(path));
};
