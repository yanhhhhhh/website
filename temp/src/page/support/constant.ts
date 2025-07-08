import banner from '@/assets/images/support/banner.webp';
import mobileBanner from '@/assets/images/support/banner-m.webp';
import item01 from '@/assets/images/support/01.webp';
import item02 from '@/assets/images/support/02.webp';
import item03 from '@/assets/images/support/03.webp';
export const supportBanner = {
  title: 'support.bannerTitle',
  description: 'support.bannerDesc',
  image: {
    pc: banner,
    mobile: mobileBanner,
  },
};
export const supportList = [
  {
    title: 'support.item1Title',
    icon: 'support-policy',
    description: 'support.item1Desc',
    image: item01,
    anchor: 'policy',
  },
  {
    title: 'support.item2Title',
    icon: 'support-faq',
    description: 'support.item2Desc',
    image: item02,
    anchor: 'faq',
  },

  {
    title: 'support.item3Title',
    icon: 'support-video',
    description: 'support.item3Desc',
    image: item03,
    anchor: 'video-tutorial',
  },
];
