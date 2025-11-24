

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.jsx',
        conditions: ['?react'],
      },
    },
    'http://*.svg': {
      loaders: ['file-loader'],
      as: '*.svg',
    },
    'https://*.svg': {
      loaders: ['file-loader'],
      as: '*.svg',
    },
  },
};

export default nextConfig;