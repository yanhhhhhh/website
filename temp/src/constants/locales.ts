import enUS from '@/assets/jsons/locales/en_US.json';
import zhCN from '@/assets/jsons/locales/zh_CN.json';
export const resources = {
  'en_US': {
    translation: enUS,
  },
  'zh_CN': {
    translation: zhCN,
  },
};
export const languages: {
  key: string;
  short: string;
  long: string;
}[] = [
  { key: 'en_US', short: 'EN', long: 'English (US)' },
  { key: 'zh_CN', short: '中', long: '中国（大陆）（简体中文)' },
];
