import { maxSize } from '../constant';
import { TComponentState, TPlatform, TSizeUnit } from '../type';

export function getMaxSize(platform: TPlatform) {
  if (platform === 'pc') {
    return {
      width: 1920,
      height: 1080,
    };
  } else {
    return {
      width: 750,
      height: 1210,
    };
  }
}
// 写一个方法将传入的数字转换为 以rem为单位的字符串
export function pxToRem(px: number, status: TComponentState) {
  if (status === 'edit') {
    // 如果是编辑状态，直接返回px
    return `${px}px`;
  } else {
    // 优化：如果是最大值，直接返回100vw
    if (px === maxSize.pc.width || px === maxSize.mobile.width) {
      return '100vw';
    }
    return `${px / 100}rem`;
  }
}
/**
 * 转换尺寸（px 在render 和preview 需要转化为rem）
 * @param size
 * @param status
 * @param unit 单位
 * @returns
 */
export function transformSize(
  size: number,
  status: TComponentState,
  unit: TSizeUnit = 'px'
) {
  if (unit === 'px') {
    return pxToRem(size, status);
  }
  return `${size}${unit}`;
}
/**
 * 判断是否是空对象
 * @param obj
 * @returns
 */
export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}
