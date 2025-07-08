import { HeroEE2kWhAdvantages } from '@/constants/production/HeroEE2kWh';
import { useTranslation } from 'react-i18next';
import './index.less';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { useMemo } from 'react';
const { first, second } = HeroEE2kWhAdvantages;
export const HeroEE2Advantages = () => {
  const { t } = useTranslation();
  const { device, languageCode } = useAtomValue(baseConfig);
  const firstImage = useMemo(() => {
    if (device.isMobile) {
      return languageCode === 'en' ? first.enMobileImage : first.mobileImage;
    }
    return languageCode === 'en' ? first.enImage : first.image;
  }, [device.isMobile, languageCode]);
  const secondImage = useMemo(() => {
    return device.isMobile ? second.mobileImage : second.image;
  }, [device.isMobile]);
  return (
    <div
      className={`HeroEE2Advantages ${languageCode}`}
      style={{
        backgroundImage: `url(${
          device.isMobile
            ? HeroEE2kWhAdvantages.mobileImage
            : HeroEE2kWhAdvantages.image
        })`,
      }}
    >
      <div className="top">
        <div className="title">{t(HeroEE2kWhAdvantages.title)}</div>
        <div className="desc">{t(HeroEE2kWhAdvantages.description)}</div>
      </div>

      <div className="advantages">
        <div className="first advantage">
          <div className="text-wrap">
            <div className="title">{t(first.advantage)}</div>
            <div className="center">
              <div className="center-number">{t(first.number)}</div>
              <div className="center-desc">{t(first.description)}</div>
            </div>
            <div className="secondDescription">
              {t(first.secondDescription)}
            </div>
          </div>

          <img className="img" src={firstImage} alt="" />
        </div>
        <div className="second advantage">
          <div className="text-wrap">
            <div className="title">{t(second.advantage)}</div>
            <div className="center">
              <div className="center-number">{t(second.number)}</div>
              <div className="center-desc">{t(second.description)}</div>
            </div>
            <div className="secondDescription">
              {t(second.secondDescription)}
            </div>
          </div>
          <img className="img" src={secondImage} alt="" />
        </div>
      </div>
    </div>
  );
};
