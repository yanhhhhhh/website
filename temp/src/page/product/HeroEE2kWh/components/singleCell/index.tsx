import { HeroEE2kWhCell } from '@/constants/production/HeroEE2kWh';
import { HeroEECell } from '@/pages/product/HeroEECommon/cell';
export const HeroEE2Cell = () => {
  return (
    <div className={`HeroEE2Cell`}>
      <HeroEECell cell={HeroEE2kWhCell} />
    </div>
  );
};
