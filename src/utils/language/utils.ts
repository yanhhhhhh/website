import { Lang } from '@/stores';

// https://uutool.cn/info-lang/#google_vignette
enum languageEnum {
  zh = 'zh', // ————————中文
  zhCN = 'zh_CN', // 中国大陆
  zhMO = 'zh-MO', // 澳门
  zhTW = 'zh-TW', // 台湾
  zhHk = 'zh-HK', // 香港
  en = 'en', // ————————英文
  enUS = 'en_US', // 美国
  enZA = 'en-ZA', // 南非
  sw = 'sw', // Swahili 斯瓦西里语
  swKE = 'sw-KE', // 肯尼亚
  ig = 'ig', // 伊博语
  igNG = 'ig-NG', // 尼日利亚
  af = 'af', // 荷兰语
  afZA = 'af-ZA', // 南非
}

// 获取浏览器语言
export const getUALangugeStr = (): Lang => {
  const naLan = navigator.language;
  return transLanStr(naLan);
};

export const transLanStr = (originalStr: string): Lang => {
  let newStr = 'en_US';
  if (originalStr.indexOf('zh') > -1) {
    newStr = 'zh_CN';
  } else if (originalStr.indexOf('en') > -1) {
    newStr = 'en_US';
  }
  return newStr;
};
