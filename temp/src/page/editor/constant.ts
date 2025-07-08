import { TSizeUnit } from './type';

export const previewScale = {
  pc: 2.5,
  mobile: 2,
};
export const maxSize = {
  pc: {
    width: 1920,
    height: 1080,
  },
  mobile: {
    width: 750,
    height: 1500,
  },
};

export const widthSizeUnit: {
  label: TSizeUnit;
  value: TSizeUnit;
}[] = [
  {
    label: 'px',
    value: 'px',
  },

  {
    label: 'vw',
    value: 'vw',
  },
];
export const heightSizeUnit: {
  label: TSizeUnit;
  value: TSizeUnit;
}[] = [
  {
    label: 'px',
    value: 'px',
  },

  {
    label: 'vh',
    value: 'vh',
  },
];
