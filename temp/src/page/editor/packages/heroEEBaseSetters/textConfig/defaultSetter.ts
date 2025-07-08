import { aboutUsNav, homeNav, productionNav } from '@/constants/navigator';

// 组件的默认 配置
export const internalLink = [
  {
    label: '首页',
    value: homeNav.children[0].to,
  },
  ...productionNav.children.map((child) => ({
    label: child.label,
    value: child.to,
  })),
  ...aboutUsNav.children.map((child) => ({
    label: child.label,
    value: child.to,
  })),
];
export type TTextType = 'text' | 'externalLink' | 'internalLink';
export const textTypeOptions = [
  {
    label: '文本',
    value: 'text',
  },
  {
    label: '外部链接',
    value: 'externalLink',
  },
  {
    label: '内部链接',
    value: 'internalLink',
  },
];
export const fontWeights = [
  {
    label: '正常',
    value: 'normal',
  },
  {
    label: '加粗',
    value: 'bold',
  },
  {
    label: '细体',
    value: 'lighter',
  },
];
export const textPositionOptions = [
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '自定义',
    value: 'custom',
  },
];
export const textWrapOptions = [
  {
    label: '不换行',
    value: 'nowrap',
  },
  {
    label: '自动换行',
    value: 'wrap',
  },
];
