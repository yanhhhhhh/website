import solarPanelBannerImage from '@/assets/images/solarPanel/banner.png';
import solarPanelMobileBannerImage from '@/assets/images/solarPanel/banner-m.png';
import solarPanelMobileProductionImage01 from '@/assets/images/solarPanel/01-m.png';
import solarPanelMobileProductionImage02 from '@/assets/images/solarPanel/02-m.png';
import solarPanelMobileProductionImage03 from '@/assets/images/solarPanel/03-m.webp';

export const solarPanelBanner = {
  image: solarPanelBannerImage,
  title: 'solarPanelPage.bannerTitle',
  description: 'solarPanelPage.bannerDesc',
  mobileImage: solarPanelMobileBannerImage,
};

export const solarPanelProductions = [
  {
    title: 'solarPanelPage.solarPanelProductionTitle01',
    image: solarPanelMobileProductionImage01,

    //购买链接
    more: undefined,
  },
  {
    title: 'solarPanelPage.solarPanelProductionTitle02',
    image: solarPanelMobileProductionImage02,

    more: undefined,
  },
  {
    title: 'solarPanelPage.solarPanelProductionTitle03',
    image: solarPanelMobileProductionImage03,
    more: undefined,
  },
];
