import { I18nObject } from '@/api/i18n';
import { TDefaultSetter } from '@/api/labelContent';
import { defaultTextConfig } from '@/pages/editor/type';
import { TTextType } from '../../heroEEBaseSetters/textConfig/defaultSetter';

export type TTextConfig = typeof defaultTextConfig & {
  type: TTextType;
};
export type TText = {
  id: string;
  config: TTextConfig;
  i18nData: I18nObject;
};

//Setter 组件的默认 配置
const componentSetterType = 'HeroEEImageSetter';
const componentType = 'HeroEEImage';
export const setter = {
  componentProps: {
    text: [] as TText[],

    style: {
      pc: {
        width: 1920,
        height: 800,
        widthUnit: 'px',
        heightUnit: 'px',
      },
      mobile: {
        width: 750,
        height: 600,
        widthUnit: 'px',
        heightUnit: 'px',
      },
    },
  },

  // componentEvents: {},
} as const;
export const defaultSetter: TDefaultSetter = {
  componentType,
  componentSetterType,
  ...setter,
};
export default defaultSetter;
