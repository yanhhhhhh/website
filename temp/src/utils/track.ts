// IEventCode 为 WEBSITE_ACCESS 时，websiteAccessMap （路由key-eventContent必选字段），
// 方便在路由处做埋点操作名称的映射

import { trackGather } from '@/api/track';

// 排除不需要埋点的路由
export const websiteAccessMap = {
  home: {
    operation: '首页',
    routerKey: 'home',
  },
  HeroEE1: {
    operation: '一度电',
    routerKey: 'HeroEE1',
  },
  HeroEE2: {
    operation: '两度电',
    routerKey: 'HeroEE2',
  },
  HeroEE8: {
    operation: '八度电',
    routerKey: 'HeroEE8',
  },
  HeroEE16: {
    operation: '十六度电',
    routerKey: 'HeroEE16',
  },
  solarPanel: {
    operation: '太阳能板',
    routerKey: 'solarPanel',
  },
  parts: {
    operation: '配件',
    routerKey: 'parts',
  },
  companyProfile: {
    operation: '公司简介',
    routerKey: 'companyProfile',
  },
  contactUs: {
    operation: '联系我们',
    routerKey: 'contactUs',
  },
  news: {
    operation: '最新动态',
    routerKey: 'news',
  },
  download: {
    operation: 'APP',
    routerKey: 'download',
  },
} as Record<string, { operation: string; routerKey: string }>;
export const downloadHashMap = {
  '#download?': {
    operation: '手册下载',
    routerKey: 'download',
  },
  '#app?': {
    operation: 'APP',
    routerKey: 'download',
  },
} as Record<string, { operation: string; routerKey: string }>;
// export const websiteDownloadMap = {
//   APP: {
//     operation: 'APP手册下载',
//   },
//   一度电: {
//     operation: '1度电手册下载',
//   },
//   两度电: {
//     operation: '2度电手册下载',
//   },
//   八度电: {
//     operation: '8度电手册下载',
//   },
//   十六度电: {
//     operation: '16度电手册下载',
//   },
// } as Record<string, { operation: string }>;
export const websiteLinkMap = {
  email: {
    operation: '邮箱',
  },
  socialMedia: {
    operation: '社媒',
  },
  phone: {
    operation: '联系电话',
  },
  purchase: {
    operation: '购买链接',
  },
  newsDetail: {
    operation: '案例跳转',
  },
  switchCountry: {
    operation: '国家跳转',
  },
  contactUs: {
    operation: '联系我们',
  },
};
