import HeroEE1 from '@/assets/images/heroEE1.png';
import HeroEE2 from '@/assets/images/heroEE2.png';
import HeroEE16 from '@/assets/images/heroEE16.png';
import HeroEE8 from '@/assets/images/heroEE8.png';
export const kenyaServiceNav = {
  name: 'navigator.service',
  to: '/download',
  path: '/download',

  children: [
    // {
    //   name: 'APP',
    //   to: '/download#app',
    //   path: '/download#app',
    //   type: 'anchor',
    // },
    // {
    //   name: 'navigator.tutorialDownload',
    //   path: '/download#download',
    //   to: '/download#download',
    //   type: 'anchor',
    // },
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

const kenyaProduction = [
  {
    name: 'navigator.HeroEE1',
    to: '/',
    label: 'HeroEE 1',
    path: '/',
    image: HeroEE1,
    type: 'route',
  },
  {
    name: 'navigator.HeroEE2',
    to: '/product_intro/2kWh',
    label: 'HeroEE 2',
    path: '/product_intro/2kWh',
    image: HeroEE2,
    type: 'route',
  },
  {
    name: 'navigator.HeroEE8',
    to: '/product_intro/8kWh',
    label: 'HeroEE 8',
    path: '/product_intro/8kWh',
    image: HeroEE8,
    type: 'route',
  },
  {
    name: 'navigator.HeroEE16',
    to: '/product_intro/16kWh',
    label: 'HeroEE 16',
    path: '/product_intro/16kWh',
    image: HeroEE16,
    type: 'route',
  },
];
export const kenyaProductionNav = {
  name: 'navigator.production',
  to: '/',
  path: '/',
  children: [...kenyaProduction],
};
export const kenyaMobileNavList = [kenyaProductionNav, kenyaServiceNav];
