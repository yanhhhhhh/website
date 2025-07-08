import { TFile } from '@/api/file';

import { TText } from '../heroEEImage/defaultSetter';
import { uuid } from '@/utils';
export const defaultCarouselData = {
  id: uuid(),
  image: {
    pc: {},
    mobile: {},
  },
  text: [] as TText[],
} as CarouselData;

export interface CarouselData {
  id: string;
  image: {
    pc: TFile;
    mobile: TFile;
  };
  text: TText[];
}

//Setter 组件的默认 配置
const componentType = 'HeroEECarousel';
const componentSetterType = 'HeroEECarouselSetter';
const defaultSetter = {
  componentType,
  componentSetterType,
  componentProps: {
    common: {},
    style: {
      pc: {
        width: 1920,
        height: 800,
        widthUnit: 'px' as const,
        heightUnit: 'px' as const,
      },
      mobile: {
        width: 750,
        height: 600,
        widthUnit: 'px' as const,
        heightUnit: 'px' as const,
      },
    },

    carouselData: [] as CarouselData[],
  },
};
export default defaultSetter;
