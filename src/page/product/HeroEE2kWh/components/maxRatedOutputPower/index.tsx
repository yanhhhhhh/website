import { HeroEE2kWhMaxRatedOutputPower } from '@/constants/production/HeroEE2kWh';
import { useTranslation } from 'react-i18next';
import './index.less';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
export const HeroEE2MaxRatedOutputPower = () => {
  const { t } = useTranslation();
  const { languageCode } = useAtomValue(baseConfig);
  return (
    <div className={`HeroEE2MaxRatedOutputPower ${languageCode}`}>
      <div className="HeroEE2MaxRatedOutputPower-top">
        <div className="title">{t(HeroEE2kWhMaxRatedOutputPower.title)}</div>
        <div className="desc">
          {t(HeroEE2kWhMaxRatedOutputPower.description)}
        </div>

        <div className="second-desc">
          {t(HeroEE2kWhMaxRatedOutputPower.secondDescription)}
        </div>
      </div>
      <div className="HeroEE2MaxRatedOutputPower-content">
        {HeroEE2kWhMaxRatedOutputPower.devices.map((item) => {
          return (
            <div className="content-item" key={item.title}>
              <img className="content-item-image" src={item.image} />
              <div className="content-item-title">{t(item.title)}</div>
              <div className="content-item-desc">{t(item.description)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
