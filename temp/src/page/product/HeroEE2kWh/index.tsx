import {
  HeroEE2Banner,
  HeroEE2Features,
  HeroEE2Cell,
  HeroEE2BigCapacity,
  HeroEE2NoWorryPowerSupply,
  HeroEE2FamilyBackupPower,
  HeroEE2MoreScene,
  HeroEE2PackageList,
  HeroEE2EmergencyPowerSupply,
  HeroEE2AuthorityCertification,
  HeroEE2IntelligentAPPControl,
  HeroEE2MaxRatedOutputPower,
  HeroEE2Advantages,
  HeroEE2SafeElectric,
} from './components';

import './index.less';

export const HeroEE2kWh = () => {
  return (
    <div className="HeroEE1kWh">
      {/* banner */}
      <HeroEE2Banner />
      {/* 第二屏特点 */}
      <HeroEE2Features />
      {/* 大容量 大功率 */}
      <HeroEE2BigCapacity />
      {/* 支持80%以上电器，供电无忧 */}
      <HeroEE2NoWorryPowerSupply />
      {/* 高达 1000W 的最大额定输出功率 */}
      <HeroEE2MaxRatedOutputPower />
      {/* 家庭备用电源 */}
      <HeroEE2FamilyBackupPower />

      {/*  HeroEE 2 优势*/}
      <HeroEE2Advantages />
      {/* EPS紧急备电 */}
      <HeroEE2EmergencyPowerSupply />
      {/* 海辰电芯 */}
      {/* <HeroEE2Cell /> */}
      {/* 智能用电管理APP */}
      {/* <HeroEE2IntelligentAPPControl /> */}
      {/* 安全用电，暂时只有手机端有 */}
      <HeroEE2SafeElectric />
      {/* 更多场景 */}
      <HeroEE2MoreScene />
      {/* 多权威认证 */}
      {/* <HeroEE2AuthorityCertification /> */}
      {/* 包装清单 */}
      <HeroEE2PackageList />
    </div>
  );
};
export default HeroEE2kWh;
