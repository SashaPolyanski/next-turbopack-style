function isAbsoluteUrl(url: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export const transformUrl = (url: string) => {
  if (!url) {
    return '';
  }
  if (isAbsoluteUrl(url)) {
    return url;
  }

  return `/pro/app/upload/${url}`;
};
