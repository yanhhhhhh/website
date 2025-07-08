import { FC, HTMLAttributes } from 'react';
import { isNumber } from 'lodash-es';

import { create, IconName } from './icons';

export enum IconSizeEnum {
  small = 'small',
  middle = 'middle',
  large = 'large',
}

export const IconInnerSize = {
  [IconSizeEnum.small]: 12,
  [IconSizeEnum.middle]: 16,
  [IconSizeEnum.large]: 20,
};

export interface IconProps extends HTMLAttributes<SVGElement> {
  name: IconName;
  size?: keyof typeof IconSizeEnum | number;
}

let loaded = false;
(function () {
  if (!loaded) {
    window.addEventListener('DOMContentLoaded', () => {
      create();
    });
    loaded = true;
  }
})();

const Icon: FC<IconProps> = ({ name, size = 'large', ...rest }) => {
  const svgSize = isNumber(size) ? size : IconInnerSize[size];

  return (
    <svg width={svgSize} height={svgSize} {...rest}>
      <use
        fill="currentColor"
        href={`#icon-${name}`}
        xlinkHref={`#icon-${name}`}
      />
    </svg>
  );
};

export default Icon;
