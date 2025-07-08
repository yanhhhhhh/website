import { HeroEE1kWhProductType } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import './index.less';
import { useLocale, TLanguageCode } from '@/hooks';
export const HeroEE1ProductType = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);
  const { localeLangguageCode } = useLocale();
  return (
    <div className="HeroEE1ProductType">
      <div className="HeroEE1ProductType-top">
        <div className="title">{t(HeroEE1kWhProductType.title)}</div>
      </div>
      <div className="HeroEE1ProductType-content">
        {HeroEE1kWhProductType.items.map((item, index) => {
          return (
            <div
              key={index}
              className="HeroEE1ProductType-content-item"
              style={{
                backgroundImage: `url(${
                  device.isPc
                    ? item[localeLangguageCode as TLanguageCode].image
                    : item[localeLangguageCode as TLanguageCode].mobileImage
                })`,
              }}
            >
              <div className="HeroEE1ProductType-content-item-title">
                {t(item.title)}
              </div>
              {item.description && (
                <div className="HeroEE1ProductType-content-item-desc">
                  {t(item.description)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
