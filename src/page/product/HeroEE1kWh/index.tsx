import { useTranslation } from 'react-i18next';
import {
  HeroEE1Banner,
  HeroEE1OutdoorLeisure,
  HeroEE1Features,
  HeroEE1SingleCell,
  HeroEE1BigCapacity,
  HeroEE1SafeElectric,
  HeroEE1MoreScene,
  HeroEE1kPackageList,
  HeroEE1ProductType,
} from './components';
import { HeroEE1kWhElectricCore } from '@/constants';
import './index.less';
import { DescriptionItem } from '../HeroEECommon/descriptionItem';
import { HeroEE1InterlligentAppControl } from './components/interlligentAppControl';
export const HeroEE1kWh = () => {
  const { t } = useTranslation();
  return (
    <div className="HeroEE1kWh">
      {/* banner */}
      <HeroEE1Banner />
      <HeroEE1Features />
      {/* 户外休闲好搭档 */}
      <HeroEE1OutdoorLeisure />
      {/* 全新电厂级电芯 */}
      <DescriptionItem
        {...HeroEE1kWhElectricCore}
        descriptionChildren={
          <div className="electricCoreDesc">
            <span> {t(HeroEE1kWhElectricCore.descriptionFirst)} </span>
            <span className="mark">,</span>
            <span> {t(HeroEE1kWhElectricCore.descriptionSecond)} </span>
          </div>
        }
      />

      {/* 单电芯更长寿命 */}
      <HeroEE1SingleCell />
      {/* 智能用电管理APP */}
      {/* <HeroEE1InterlligentAppControl /> */}

      {/* 小身材大容量 */}
      <HeroEE1BigCapacity />
      {/* 用电安全有保障 */}
      <HeroEE1SafeElectric />
      {/* 更多场景 */}
      <HeroEE1MoreScene />
      {/* 多权威认证 */}
      {/* <DescriptionItem {...HeroEE1kWhAuthorityCertification} /> */}
      {/* 产品类型 */}
      {/* <HeroEE1ProductType /> */}
      {/* 包装清单 */}
      <HeroEE1kPackageList />
    </div>
  );
};
export default HeroEE1kWh;
