import { HeroEE1kWhFeatures } from '@/constants';
import { baseConfig } from '@/stores';

import { useAtomValue } from 'jotai';

import { useTranslation } from 'react-i18next';
import './index.less';
import { useMemo } from 'react';
import { TLanguageCode } from '@/hooks';
export const HeroEE1Features = () => {
  const { device, languageCode } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  const features = useMemo(() => {
    return {
      ...HeroEE1kWhFeatures,
      portableAndConvenient: {
        ...HeroEE1kWhFeatures.portableAndConvenient,
        image:
          HeroEE1kWhFeatures.portableAndConvenient[
            languageCode as TLanguageCode
          ].image,
        mobileImage:
          HeroEE1kWhFeatures.portableAndConvenient[
            languageCode as TLanguageCode
          ].mobileImage,
      },
    };
  }, [languageCode]);
  return (
    <div
      className={`HeroEE1-feature-wrapper ${languageCode ? languageCode : ''}`}
    >
      <div className="HeroEE1-feature-content">
        {Object.entries(features).map(([key, value]) => {
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
