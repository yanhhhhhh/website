import TemplateRender from '@/components/templateRender';

import './index.less';
import { Blackout } from './components/blackout';
export const HeroEE8kWh = () => {
  const p2 = (
    <div key="HeroEE8kWhBlackout">
      <Blackout />
    </div>
  );
  return (
    <TemplateRender
      labelName="HeroEE8"
      filledComponent={{
        2: p2,
      }}
    />
  );
};
export default HeroEE8kWh;
