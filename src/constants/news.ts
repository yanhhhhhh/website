import newBannerImage from '@/assets/images/news/banner.png';
import newBannerMobileImage from '@/assets/images/news/mobile-banner.png';
import { declarationImage } from './declaration';

export const newsBanner = {
  title: 'case.bannerTitle',
  image: newBannerImage,
  mobileImage: newBannerMobileImage,
  description: 'case.bannerDesc',
  mobileDescription: 'case.bannerMobileDesc',
};
export const newsBannerList = [
  {
    title: '',
    description: '',
    key: '严正声明',
    image: declarationImage.declarationPcZh,

    mobileImage: declarationImage.declarationMobileZh,
    en: {
      image: declarationImage.declarationPcEn,
      mobileImage: declarationImage.declarationMobileEn,
    },
    more: undefined,
  },
  {
    title: 'case.bannerTitle',
    description: 'case.bannerDesc',
    mobileDescription: 'case.bannerMobileDesc',
    key: '严正声明',
    image: newBannerImage,

    mobileImage: newBannerMobileImage,

    more: undefined,
  },
];
