import { TDefaultSetter } from '@/api/labelContent';

//Setter 组件的默认 配置
const componentSetterType = 'HeroEEVideoSetter';
const componentType = 'HeroEEVideo';
export const setter = {
  componentProps: {
    common: {},
    style: {
      pc: {
        width: 1920,
        height: 1080,
        widthUnit: 'px',
        heightUnit: 'px',
      },
      mobile: {
        width: 750,
        height: 667,
        widthUnit: 'px',
        heightUnit: 'px',
      },
    },
  },
} as const;
const defaultSetter: TDefaultSetter = {
  componentType,
  componentSetterType,
  ...setter,
};
export default defaultSetter;
