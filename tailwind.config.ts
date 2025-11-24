import type { Config } from 'tailwindcss';
// https://tailwindcss.com/docs/content
const config: Config = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './entities/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    sizing: {
      'xl-1': '4px',
      'xl-2': '8px',
      'xl-3': '12px',
      'xl-4': '16px',
      'xl-5': '20px',
      'xl-6': '24px',
      'xl-7': '28px',
      'xl-8': '32px',
      'xl-9': '36px',
      'xl-10': '40px',
      'xl-11': '44px',
      'xl-12': '48px',
      'xl-13': '52px',
      'xl-14': '56px',
      'xl-15': '60px',
      'xl-16': '64px',
      'xl-17': '68px',
      'xl-18': '72px',
      'xl-19': '76px',
      'xl-20': '80px',
      'xl-21': '84px',
    },
    letterSpacing: {
      tightest: '-4px',
      tighter: '-1px',
      tight: '-.025em',
      normal: '0',
      wide: '0.3px',
      wider: '.05em',
      widest: '.1em',
    },
    fontSize: {
      sm: ['14px', '20px'],
      md: ['12px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      xxl: ['44px', '44px'],
      xxxl: ['104px', '104px'],

      '3xl': ['104px', '104px'],
      '2xl': ['56px', '64px'],
      '1xl': ['32px', '40px'],
      '0xl': ['28px', '36px'],
      ls: ['24px', '28px'],
      l: ['24px', '32px'],
      m: ['20px', '28px'],
      sh: ['16px', '20px'],
      s: ['14px', '20px'],

      'sm-3xl': ['44px', '44px'],
      'sm-2xl': ['24px', '28px'],
      'sm-1xl': ['16px', '20px'],
      'sm-ls': ['14px', '18px'],
      'sm-l': ['14px', '20px'],
      'sm-m': ['14px', '20px'],
      'sm-s': ['12px', '16px'],

      'sm-3xl-vw': ['13.75vw', '13.75vw'],
      'sm-2xl-vw': ['7.5vw', '8.5vw'],
      'sm-1.5xl-vw': ['5.7vw', '7.2vw'],
      'sm-1xl-vw': ['5vw', '6.25vw'],
      'sm-ls-vw': ['4.375vw', '5.625vw'],
      'sm-l-vw': ['4.375vw', '6.25vw'],
      'sm-m-vw': ['', ''],
      'sm-s-vw': ['3.75vw', '5vw'],
      'sm-min-s-vw': ['3.2vw', '4.6vw'],
    },
    screens: {
      sm: '1024px',
      md: '1440px',
      lg: '976px',
      xl: '1392px',
      base: '640px',

      'max-w-sm': { max: '1023px' },
      'max-w-md': { max: '1439px' },
      'max-w-lg': { max: '1279px' },

      maxSm: { max: '1023px' },
      maxMd: { max: '1439px' },
      maxLg: { max: '1391px' },
      maxXl: { max: '1920px' },
      maxXs: { max: '479px' },

      // Phone
      phone: { max: '640px' },
    },
    borderRadius: {
      10: '40px',
      8: '32px',
      6: '24px',
      4: '16px',
      3: '12px',
      2: '8px',
      1: '4px',
      // depricated
      inherit: 'inherit',
      sm: '12px',
      lg: '24px',
      full: '100px',

      'xl-1': '4px',
      'xl-2': '8px',
      'xl-3': '12px',
      'xl-4': '16px',
      'xl-5': '20px',
      'xl-6': '24px',
      'xl-10': '40px',

      'sm-1-vw': '1.25vw',
      'sm-2-vw': '2.5vw',
      'sm-3-vw': '3.75vw',
      'sm-4-vw': '5vw',
      'sm-6-vw': '7.5vw',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    colors: {
      primary: '#7001FD',
      secondary: '#8EFD01',
      white: '#ffffff',
      'gray-extra-light': '#f5f5f5',
      'gray-light': '#BFBFBF',
      gray: '#999999',
      'bright-green': '#04D800',
      'gray-warm': '#adadad',
      'gray-dark': '#1B1B1B',
      black: '#000000',
      green: '#8EFD01',
      'violet-light': '#8527fd',
      violet: '#7001FD',
      'violet-dark': '#6501e4',
      red: '#B22222',
      'red-second': '#E10031',
      pink: '#F9CCD6',
      'white-80': 'rgba(255, 255, 255, 0.80)',
      'black-05': 'rgba(0,0,0,0.05)',
      'black-08': '#ebebeb',
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      animation: {
        open: 'open 0.5s ease-in-out normal forwards',
        close: 'close 0.5s ease-in-out normal forwards',
        shake: 'shake 0.3s ease-in-out',
      },
      keyframes: {
        close: {
          '0%': {
            'max-height': '1000px',
          },
          '100%': {
            'max-height': '0px',
          },
        },
        open: {
          '0%': {
            'max-height': '0px',
          },
          '100%': {
            'max-height': '1000px',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
      },
      fontFamily: {
        hauss: ['var(--font-hauss)'],
        montserrat: ['var(--font-montserrat)'],
        unbounded: ['var(--font-unbounded)'],
      },
      zIndex: {
        '100': '100',
        // Общие названия
        sticky: '1020',
        fixed: '1030',
        sidebar: '1040',
        popover: '1070',
      },
      colors: {
        'black-10': 'rgba(0, 0, 0, 0.10)',
      },
      boxShadow: {
        'popover-content': '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
        tooltip: '0px 0px 8px 0px rgba(0,0,0,0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
        21: '84px',

        'sm-1-vw': '1.25vw',
        'sm-2-vw': '2.5vw',
        'sm-3-vw': '3.75vw',
        'sm-4-vw': '5vw',
        'sm-5-vw': '6.25vw',
        'sm-6-vw': '7.5vw',
        'sm-7-vw': '8.75vw',
        'sm-8-vw': '10vw',
        'sm-9-vw': '11.25vw',
        'sm-10-vw': '12.5vw',
        'sm-11-vw': '13.75vw',
        'sm-12-vw': '15vw',
        'sm-13-vw': '16.25vw',
        'sm-14-vw': '17.5vw',
        'sm-15-vw': '18.75vw',
        'sm-16-vw': '20vw',
        'sm-17-vw': '21.25vw',
        'sm-18-vw': '22.5vw',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function groupPeer({ addVariant }: any) {
      const pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        'checked',
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`],
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const [variantName, state] of pseudoVariants) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addVariant(`group-peer-${variantName}`, (ctx: any) => {
          const result = typeof state === 'function' ? state(ctx) : state;
          return result.replace(/&(\S+)/, ':merge(.peer)$1 ~ .group &');
        });
      }
    },
  ],
};
export default config;
