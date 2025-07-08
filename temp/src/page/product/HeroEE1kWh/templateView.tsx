import TemplateRender from '@/components/templateRender';

import { HeroEE1MoreScene } from './components';
import './index.less';
export const HeroEE1kWh = () => {
  const p9 = (
    <div>
      <HeroEE1MoreScene key="HeroEE1MoreScene" />
    </div>
  );
  return (
    <TemplateRender
      labelName="HeroEE1"
      filledComponent={{
        9: p9,
      }}
    />
  );
};
