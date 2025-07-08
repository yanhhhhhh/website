import { HeroEE2kWhSafeElectric } from '@/constants/production/HeroEE2kWh';

import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import './index.less';
export const HeroEE2SafeElectric = () => {
  const { t } = useTranslation();
  const { languageCode, device } = useAtomValue(baseConfig);
  return (
    <div className={`HeroEE2SafeElectric ${languageCode}`}>
      {device.isMobile && (
        <div className="wrapper">
          {/* <div className="title">{t(HeroEE2kWhSafeElectric.title)}</div>
        <div className="descritpion">
          {t(HeroEE2kWhSafeElectric.description)}
        </div> */}
          <div className="content-wrapper">
            {HeroEE2kWhSafeElectric.items.map((item) => {
              return (
                <div
                  className={`content-item`}
                  key={item.title}
                  style={{
                    backgroundImage: `url(${
                      languageCode == 'en' && item.enMobileImage
                        ? item.enMobileImage
                        : item.mobileImage
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
      )}
    </div>
  );
};
