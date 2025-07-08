import TemplateRender from '@/components/templateRender';

import './index.less';
import { Blackout } from './components/blackout';
export const HeroEE16kWh = () => {
  const p2 = (
    <div key="HeroEE16kWhBlackout">
      <Blackout />
    </div>
  );
  return (
    <TemplateRender
      labelName="HeroEE16"
      filledComponent={{
        2: p2,
      }}
    />
  );
};
export default HeroEE16kWh;
