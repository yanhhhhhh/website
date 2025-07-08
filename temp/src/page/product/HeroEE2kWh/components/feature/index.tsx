import { HeroEE2kWhFeatures } from '@/constants/production/HeroEE2kWh';
import { baseConfig } from '@/stores';

import { useAtomValue } from 'jotai';

import { useTranslation } from 'react-i18next';
import './index.less';
export const HeroEE2Features = () => {
  const { device, languageCode } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return (
    <div className={`HeroEE2-feature-wrapper ${languageCode}`}>
      <div className="HeroEE2-feature-content">
        {Object.entries(HeroEE2kWhFeatures).map(([key, value]) => {
          return (
            <div
              className={`${key} card`}
              key={key}
              style={{
                backgroundImage: device.isPc
                  ? `url(${value.image})`
                  : `url(${value.mobileImage})`,
                backgroundPosition: 'center',
              }}
            >
              <div className="title">{t(value.title)}</div>
              {'description' in value && (
                <div className="description">{t(value.description)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
