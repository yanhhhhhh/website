import { TFunction } from 'i18next';

export interface Device {
  isMobile: boolean;
  isTablet: boolean; // 平板
  isPc: boolean;
}

/* 320px - 480px：移动设备
481px - 768px：iPad、平板电脑
769px - 1024px：小屏幕、笔记本电脑 */
// export const getDevice = (): Device => {
//   const w = window.document.body.clientWidth;

//   const ua = navigator.userAgent;
//   const isWindowsPhone = /(?:Windows Phone)/.test(ua);
//   const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
//   const isAndroid = /(?:Android)/.test(ua);
//   const isFireFox = /(?:Firefox)/.test(ua);
//   const isChrome = /(?:Chrome|CriOS)/.test(ua);
//   const isTablet =
//     /(?:iPad|PlayBook)/.test(ua) ||
//     (isAndroid && !/(?:Mobile)/.test(ua)) ||
//     (isFireFox && /(?:Tablet)/.test(ua));
//   const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
//   const isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;

//   const pcDbugModeFlag = w > 1024;
//   return {
//     isMobile: !pcDbugModeFlag && (isAndroid || isPhone),
//     isTablet,
//     isPc: pcDbugModeFlag || isPc,
//   };
// };
export function getDevice() {
  const w = window.document.body.clientWidth;

  const device = {
    isMobile: false,
    isTablet: false,
    isPc: false,
  };

  if (w <= 1024) {
    return {
      ...device,
      isMobile: true,
    };
  } else {
    return {
      ...device,
      isPc: true,
    };
  }
}
export const getDeviceClassname = (device: Device): string => {
  return device.isPc ? (device.isMobile ? 'mobile' : 'tablet') : '';
};

// 判断是否为平板设备
export function isTablet() {
  const width = Math.min(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  ); // 最小边
  const height = Math.max(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  ); // 最大边

  // 判断逻辑：在平板的屏幕范围内，并且支持触摸
  return width >= 768 && height <= 1366;
}

/**
 * 是否全屏
 * @returns
 */
export const isFullscreen = () => {
  return document.fullscreenElement !== null;
};

/**
 * 浏览器是否包含工具栏/ 是否非全屏
 * @returns
 */
export const isContainToolBar = () => {
  const isFullscreenFlag = isFullscreen();
  if (isFullscreenFlag) {
    return {
      flag: false,
      diff: 0,
    };
  }
  const diff = window.screen.height - window.innerHeight;
  return {
    flag: diff > 0,
    diff,
  };
};

/**
 * 是否含有汉字
 * @param s
 * @returns
 */
export const isContainChinese = (s: string): boolean => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  return reg.test(s);
};

const imagePreloader = (url: string) => {
  return new Promise((resolve, reject) => {
    let temp: HTMLImageElement | null = new Image();
    temp.src = url;
    temp.onload = () => {
      resolve('true');
    };
    temp.onerror = () => {
      reject('false');
    };

    temp = null;
  });
};

/**
 * 预加载图片
 * @param pics
 */

export const batchLoadImages = (pics: string[]) => {
  const promiseArr = new Array<Promise<any>>();
  pics.forEach((url) => {
    //所有加载promise
    promiseArr.push(imagePreloader(url));
  });
  //执行结果
  return Promise.allSettled(promiseArr).then((statuses) => {
    if (process.env.NODE_ENV) {
      // 记录加载失败的图片索引值
      const arr: number[] = [];
      statuses.forEach((ele, index) => {
        if (ele.status === 'rejected') {
          arr.push(index);
        }
      });
      if (arr.length) {
        console.warn('images load failed', arr);
      }
    }
  });
};

/**
 * 根据不同国家获取转换后的面值
 * @param rmbPrice 人民币面值
 * @param language 当前语言
 * @param translate 国际化转换方法
 * @param currencySign 当前货币符号，默认为人民币符号
 * @returns
 */
export const getPrice = (rmbPrice: number, language: string) => {
  let newPrice = rmbPrice;
  switch (language) {
    case 'en_US':
      newPrice = rmbPrice / 7.2;
      break;
    default:
      break;
  }

  return `${newPrice === 0 ? 0 : newPrice.toFixed(2)}`;
};

/**
 * 处理 带有价格 的文案翻译
 * @param oldStr 旧字符串、含有中文的translate
 * @param replaceCostStr 文案中被替换的中文价格
 * @param price 新的中文价格
 * @param language 语言
 * @param t 翻译方法
 * @returns
 */
export const getPriceWriting = (
  oldStr: string,
  replaceCostStr: string,
  price: number,
  language: string,

  t: TFunction<'translation', undefined>
) => {
  let str = t(oldStr);
  const cost = getPrice(price || 0, language);
  const costWithSign = `${t('charts.currencySign')}${cost}`;

  str = str.replace(new RegExp(replaceCostStr, 'g'), costWithSign);
  return str;
};

export const getBrowsers = () => {
  const ua = navigator.userAgent.toLowerCase();

  const isIphone = /iphone/.test(ua);
  const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;

  const isMobile = isIphone || isAndroid;
  const isHuawei = /huawei/.test(ua);
  const isHonor = /honor/.test(ua);
  const isOppo = /oppo/.test(ua);
  const isOppoR15 = /pacm00/.test(ua);
  const isVivo = /vivo/.test(ua);
  const isXiaomi = /mi\s/.test(ua);
  const isXiaomi2s = /mix\s/.test(ua);
  const isRedmi = /redmi/.test(ua);
  const isSamsung = /sm-/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
  const isWxWork = /wxwork/.test(ua); // 企业微信
  const isWechat = /micromessenger/.test(ua) && !isWxWork;
  const isBaidu = /baidu/.test(ua);
  const isQQ = /qq/.test(ua);

  return {
    isIphone,
    isAndroid,
    isMobile,
    isSafari,
    isHuawei,
    isSamsung,
    isRedmi,
    isXiaomi2s,
    isXiaomi,
    isVivo,
    isOppoR15,
    isOppo,
    isHonor,
    isBaidu,
    isWechat,
    isQQ,

    isWxWork,
  };
};

export const nextTick = () => {
  return new Promise((resolve) => {
    if (typeof MutationObserver !== 'undefined') {
      // 使用 MutationObserver 监听 DOM 变化
      const observer = new MutationObserver(resolve);
      const textNode = document.createTextNode('1');
      observer.observe(textNode, {
        characterData: true,
      });
      textNode.textContent = '2';
    } else {
      // fallback 方案，使用 setTimeout 模拟异步
      setTimeout(resolve, 0);
    }
  });
};

export const getDomWh = (dom: HTMLElement) => {
  const rect: DOMRect = dom.getBoundingClientRect();

  const w = (rect && rect.width) || dom.clientWidth || dom.offsetWidth;
  const h = (rect && rect.height) || dom.clientHeight || dom.offsetHeight;

  return {
    width: w,
    height: h,
  };
  // if (w) {
  //   return {
  //     width: w,
  //     height: h
  //   }
  // } else {
  //   const s = window.getComputedStyle(dom);
  //   return {
  //     width: parseFloat(s.width) || document.body.clientWidth || window.screen.width,
  //     height: parseFloat(s.height) || window.screen.height,
  //   }
  // }
};

export function getRegionAndLanguage(location?: string) {
  const [region, language] = location ? location.split('-') : [];
  return {
    region,
    language,
  };
}
