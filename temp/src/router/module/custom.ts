export interface ICustomPage {
  label: string;
  key: string;
  path: string;
  component: string;
  handle?: any;
  type: 'route' | 'anchor' | 'link';
}
// 现有的自定义页面列表（方便配置菜单时获取列表）
export const customPageList: ICustomPage[] = [
  {
    label: '首页',
    key: 'home',
    path: '/',
    component: '/pages/home',
    type: 'route',
    handle: {
      key: 'home',
    },
  },
  // 产品
  {
    label: 'HeroEE1',
    key: 'HeroEE1',
    path: 'product_intro/1kWh',
    component: '/pages/product/HeroEE1kWh',
    type: 'route',
    handle: {
      key: 'HeroEE1',
    },
  },
  {
    label: 'HeroEE2',
    key: 'HeroEE2',
    path: 'product_intro/2kWh',
    component: '/pages/product/HeroEE2kWh',
    type: 'route',
    handle: {
      key: 'HeroEE2',
    },
  },
  {
    label: '太阳能板',
    key: 'solarPanel',
    path: 'solarPanel',
    component: '/pages/solarPanel',
    type: 'route',
    handle: {
      key: 'solarPanel',
    },
  },
  {
    label: '配件',
    key: 'parts',
    path: 'parts',
    component: '/pages/parts',
    type: 'route',
    handle: {
      key: 'parts',
    },
  },
  // 关于我们
  {
    label: '公司简介',
    key: 'companyProfile',
    path: 'aboutUs/companyProfile',
    component: '/pages/aboutUs',
    type: 'route',
    handle: {
      key: 'companyProfile',
    },
  },
  {
    label: '联系我们',
    key: 'contactUs',
    path: 'aboutUs/contactUs',
    component: '/pages/aboutUs',
    type: 'route',
    handle: {
      key: 'contactUs',
    },
  },
  {
    label: '最新动态',
    key: 'news',
    path: 'aboutUs/news',
    component: '/pages/news',
    type: 'route',
    handle: {
      key: 'news',
    },
  },
  {
    label: '商务合作',
    key: 'cooperation',
    path: 'aboutUs/cooperation',
    component: '/pages/cooperation',
    type: 'route',
    handle: {
      key: 'cooperation',
    },
  },
  // 服务
  {
    label: 'APP',
    key: 'app',
    path: 'download/app',
    component: '/pages/download',
    type: 'route',
    handle: {
      key: 'download',
      param: {
        anchor: 'app',
      },
    },
  },
  {
    label: '手册下载',
    key: 'manual',
    path: 'download/manual',
    component: '/pages/download',
    type: 'route',
    handle: {
      key: 'download',
      param: {
        anchor: 'manual',
      },
    },
  },
  {
    label: '隐私政策',
    key: 'privacyPolicy',
    path: '',
    component: '',
    type: 'link',
    handle: {
      key: 'agreement',
    },
  },
  {
    label: '用户协议',
    key: 'userAgreement',
    path: '',
    component: '',
    type: 'link',
    handle: {
      key: 'agreement',
    },
  },
  {
    label: '售后政策',
    key: 'policy',
    path: 'support/policy',
    component: '/pages/support',
    type: 'route',
    handle: {
      key: 'support',
      param: {
        anchor: 'policy',
      },
    },
  },
  {
    label: '常见问题',
    key: 'faq',
    path: 'support/faq',
    component: '/pages/support',
    type: 'route',
    handle: {
      key: 'support',
      param: {
        anchor: 'faq',
      },
    },
  },
  {
    label: '教程视频',
    key: 'video-tutorial',
    path: 'support/video-tutorial',
    component: '/pages/support',
    type: 'route',
    handle: {
      key: 'support',
      param: {
        anchor: 'video-tutorial',
      },
    },
  },
];
