import { Metadata } from 'next';

import { META_DEFAULT_VALUE } from '../constants/meta-default-values';
import { MetaTags } from './types';

const IMAGES_OG = [
  {
    url: `/static/openGraph.png`,
    width: 1200,
    height: 630,
    alt: 'PRO Wildberries – центр развития бизнеса',
  },
];
const IMAGES_TWT = [
  {
    url: `/static/twitter.png`,
    width: 1200,
    height: 675,
    alt: 'PRO Wildberries – центр развития бизнеса',
  },
];

export const getMeta = (metaTags: MetaTags = {}): Metadata => {
  const {
    title = META_DEFAULT_VALUE.TITLE,
    description = META_DEFAULT_VALUE.DESCRIPTION,
    vkTitle = title,
    vkDescription = description,
    ogTitle = title,
    ogDescription = description,
    twitterTitle = title,
    twitterDescription = description,
    withPageDescription = true,
  } = metaTags;

  return {
    ...(withPageDescription ? { description } : {}),
    other: {
      'vk:title': vkTitle,
      'vk:description': vkDescription,
    },
    openGraph: {
      type: 'website',
      url: '/',
      title: ogTitle,
      description: ogDescription,
      siteName: 'PRO Wildberries',
      images: IMAGES_OG,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: IMAGES_TWT,
    },
  };
};
