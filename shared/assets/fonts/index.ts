import localFont from 'next/font/local';

const hauss = localFont({
  src: [
    {
      path: './hauss/als_hauss_black.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './hauss/als_hauss_bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './hauss/als_hauss_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './hauss/als_hauss_regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-hauss',
});

const montserrat = localFont({
  src: [
    {
      path: './montserrat/Montserrat-Black.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
});
const unbounded = localFont({
  src: [
    {
      path: './unbounded/Unbounded-Black.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './unbounded/Unbounded-Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './unbounded/Unbounded-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './unbounded/Unbounded-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-unbounded',
});

export { hauss, montserrat, unbounded };
