import { HeroEE1kWhSafeElectric } from '@/constants';

import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import './index.less';
import { TLanguageCode, useLocale } from '@/hooks';
export const HeroEE1SafeElectric = () => {
  const { t } = useTranslation();
  const { localeLangguageCode } = useLocale();
  const { device, languageCode } = useAtomValue(baseConfig);
  return (
    <div className={`HeroEE1SafeElectric ${languageCode}`}>
      <div className="wrapper">
        <div className="title">{t(HeroEE1kWhSafeElectric.title)}</div>
        <div className="descritpion">
          {t(HeroEE1kWhSafeElectric.description)}
        </div>
        <div className="content-wrapper">
          {HeroEE1kWhSafeElectric.items.map((item) => {
            return (
              <div
                className={`content-item`}
                key={item.title}
                style={{
                  backgroundImage: device.isPc
                    ? `url(${item[localeLangguageCode as TLanguageCode].image})`
                    : `url(${
                        item[localeLangguageCode as TLanguageCode].mobileImage
                      })`,
                }}
              >
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
