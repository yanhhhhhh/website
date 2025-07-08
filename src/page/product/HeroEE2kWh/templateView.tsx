import TemplateRender from '@/components/templateRender';
import { HeroEE2MoreScene } from './components';

import './index.less';

export const HeroEE2kWh = () => {
  const p11 = <HeroEE2MoreScene key="HeroEE2MoreScene" />;
  return (
    <TemplateRender
      labelName="HeroEE2"
      filledComponent={{
        11: p11,
      }}
    />
  );
};
