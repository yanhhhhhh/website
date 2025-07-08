import { Icon, IconName } from '@/components';
import { HeroEE16kWhBlackout } from '@/constants/production/HeroEE16kWh';
import AnimationView from '@/pages/product/HeroEECommon/animationView';
import { baseConfig } from '@/stores';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import './index.less';
import { useTranslation } from 'react-i18next';
export const Blackout = () => {
  const { title, description, images } = HeroEE16kWhBlackout;
  const { device, languageCode } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  const animationViewProps = useMemo(() => {
    const imageFirst = device.isPc ? images.pc[0] : images.mobile[0];
    const imageSecond = device.isPc ? images.pc[1] : images.mobile[1];
    return { title, desc: description, imageFirst, imageSecond };
  }, [description, device.isPc, images, title]);
  return (
    <AnimationView
      {...animationViewProps}
      children={
        <div className={`heroEE16kWh-blackout-feature-wrapper ${languageCode}`}>
          {HeroEE16kWhBlackout.features.map((feature) => (
            <div key={feature.title} className="feature">
              <Icon className="icon" name={feature.icon as IconName} />

              <div className="title">{t(feature.title)}</div>
            </div>
          ))}
        </div>
      }
    />
  );
};
