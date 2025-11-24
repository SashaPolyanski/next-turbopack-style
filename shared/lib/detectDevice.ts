export function detectDevice(): string {
  const toMatch = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
    'Linux',
    'Mac OS',
    'Windows',
  ];
  return (
    toMatch.find((toMatchItem) => {
      return window.navigator.userAgent.indexOf(toMatchItem) !== -1;
    }) ||
    window.navigator.userAgent.match(/\(([^)]+)\)/)?.[1] ||
    ''
  );
}
