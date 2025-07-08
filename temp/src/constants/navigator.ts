import Wechat from '@/components/icons/icon-svg/icon_hot_wechat.svg';
import Titok from '@/components/icons/icon-svg/icon_hot_titok.svg';
import Facebook from '@/components/icons/icon-svg/icon_hot_facebook.svg';
import Email from '@/components/icons/icon-svg/icon_hot_email.svg';
import Ins from '@/components/icons/icon-svg/icon_hot_ins.svg';
import Twitter from '@/components/icons/icon-svg/icon_hot_twitter.svg';
import Google from '@/components/icons/icon-svg/icon_hot_google.svg';
import YouTube from '@/components/icons/icon-svg/icon_hot_youtube.svg';

import HeroEE1 from '@/assets/images/heroEE1.png';
import HeroEE2 from '@/assets/images/heroEE2.png';
import HeroEE16 from '@/assets/images/heroEE16.png';
import HeroEE8 from '@/assets/images/heroEE8.png';
import { kenyaTiktop } from './kenya';

export const homeNav = {
  name: 'navigator.home',
  label: '首页',
  children: [
    {
      name: 'navigator.home',
      to: '/',
      path: '/',
      type: 'route',
    },
  ],
};
const production = [
  {
    name: 'navigator.HiTHIUMHeroEE1',
    to: '/product_intro/1kWh',
    label: 'HeroEE 1',
    path: '/product_intro/1kWh',
    image: HeroEE1,
    type: 'route',
  },
  {
    name: 'navigator.HiTHIUMHeroEE2',
    to: '/product_intro/2kWh',
    label: 'HeroEE 2',
    path: '/product_intro/2kWh',
    image: HeroEE2,
    type: 'route',
  },
  {
    name: 'navigator.HiTHIUMHeroEE8',
    to: '/product_intro/8kWh',
    label: 'HeroEE 8',
    path: '/product_intro/8kWh',
    image: HeroEE8,
    type: 'route',
  },
  {
    name: 'navigator.HiTHIUMHeroEE16',
    to: '/product_intro/16kWh',
    label: 'HeroEE 16',
    path: '/product_intro/16kWh',
    image: HeroEE16,
    type: 'route',
  },
];
export const powerSupply = {
  title: 'navigator.production',
  name: 'navigator.production',
  to: '/production',
  path: '/production',
  children: production,
};

export const productionNav = {
  name: 'navigator.production',
  to: '/product_intro/1kWh',
  path: '/product_intro/1kWh',
  children: [
    ...production,

    {
      name: 'navigator.solarPanel',
      to: '/solarPanel',
      label: '太阳能板',
      path: '/solarPanel',
      type: 'route',
    },
    {
      name: 'navigator.parts',
      to: '/parts',
      label: '配件',
      path: '/parts',
      type: 'route',
    },
  ],
};
export const aboutUsNav = {
  name: 'navigator.aboutUs',
  to: '/aboutUs',
  path: '/aboutUs',
  children: [
    {
      name: 'navigator.companyProfile',
      to: '/aboutUs/companyProfile',
      label: '公司介绍',
      path: '/aboutUs/companyProfile',
      type: 'route',
    },
    {
      name: 'navigator.contactUs',

      to: '/aboutUs/contactUs',
      label: '联系我们',
      path: '/aboutUs/contactUs',
      type: 'route',
    },

    {
      name: 'navigator.latestNews',
      to: '/aboutUs/news',
      label: '最新动态',
      path: '/aboutUs/news',
      type: 'route',
    },
  ],
};
export const serviceNav = {
  name: 'navigator.service',
  to: '/download',
  path: '/download',

  children: [
    {
      name: 'APP',

      path: '/download#app',
      label: 'APP',
      to: '/download#app',
      type: 'anchor',
    },
    {
      name: 'navigator.tutorialDownload',
      path: '/download#download',
      label: '手册下载',
      to: '/download#download',
      type: 'anchor',
    },

    {
      name: 'navigator.privacyPolicy',
      path: '/agreement/privacy',
      label: '隐私协议',
      to: '/agreement/privacy',
      type: 'route',
    }, //隐私协议
    // 用户协议
    {
      name: 'navigator.userAgreement',
      path: '/agreement/users',
      label: '用户协议',
      to: '/agreement/users',
      type: 'route',
    },
  ],
};
export const mobileNavList = [productionNav, aboutUsNav, serviceNav];
// { icon: Wechat, to: '' },
// { icon: Google, to: '' },
// { icon: Twitter, to: '' },
export interface IThirdLinks {
  icon: string;
  to: string;
  type: string;
}
export const thirdLinks: IThirdLinks[] = [
  { icon: Titok, to: 'https://www.tiktok.com/@heroeehithium', type: 'titok' },

  {
    icon: Facebook,
    to: 'https://www.facebook.com/profile.php?id=61557349343575',
    type: 'fb',
  },
  {
    icon: YouTube,
    to: ' https://www.youtube.com/channel/UCu3Tzkog43hWdW0YSwts2ig',
    type: 'YTB',
  },
  {
    icon: Ins,
    to: 'https://www.instagram.com/heroee_global_hithium',
    type: 'INS',
  },
];
export const AficaLinks: IThirdLinks[] = [
  { icon: Titok, to: kenyaTiktop, type: 'titok' },

  {
    icon: Facebook,
    to: 'https://www.facebook.com/profile.php?id=61557349343575',
    type: 'fb',
  },
  {
    icon: YouTube,
    to: ' https://www.youtube.com/channel/UCu3Tzkog43hWdW0YSwts2ig',
    type: 'YTB',
  },
  {
    icon: Ins,
    to: 'https://www.instagram.com/heroee_global_hithium',
    type: 'INS',
  },
];

//针对个别国家的第三方链接
export const otherThirdLinks = {
  KE: AficaLinks,
  CN: [],
  NG: AficaLinks,
};

export const other = {
  email: { icon: Email, to: '' },

  phone: '+86 193 2875 4390',
  serviceHotLine: 'navigator.serviceHotLine',
  serviceTip: 'navigator.serviceTip',
  emailPlaceholder: 'navigator.emailPlaceholder',
};
export const EnCountryPhone = '+86 193 2875 4421';
// 全球邮箱
export const globalEmail = 'SDG7@hithium.com';
