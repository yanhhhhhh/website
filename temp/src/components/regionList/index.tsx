// import { regionCountry } from '@/constants';
import { useTranslation } from 'react-i18next';
import './index.less';

import { baseConfig, isShowRegion, regionListAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';

import { useLocale, useWebsiteLinkTrack } from '@/hooks';

const RegionList = () => {
  const base = useAtomValue(baseConfig);
  const { changeLanguagePostProcessor } = useLocale();
  const regionCountry = useAtomValue(regionListAtom);

  const { t } = useTranslation();

  type RegionCountry = (typeof regionCountry)[0]['countries'][0];
  const setIsShowRegion = useSetAtom(isShowRegion);
  const { switchCountryTrack } = useWebsiteLinkTrack();
  const selectLanguage = (element: RegionCountry) => {
    if (base.device.isPc) {
      setIsShowRegion(() => false);
    }
    switchCountryTrack(element.countryCode);
    document.body.style.overflowY = 'auto';

    changeLanguagePostProcessor(element);
  };

  return (
    <section className="region-list-container">
      <p className="select-region title">
        {t('region.selectCountryAndRegion')}
      </p>
      <div className="region-list">
        {regionCountry.map((item) => (
          <div key={item.region} className="region-item">
            <p className="region-title title">
              {t('region.' + item.regionName)}
            </p>
            <ul className="country-list">
              {item.countries.map((country) => (
                <li
                  key={country.countryCode}
                  className="country-item"
                  onClick={() => selectLanguage(country)}
                >
                  <span className="country-item-value country">
                    {country.country}
                  </span>

                  <span className="country-item-value language">
                    （{country.languageName}）
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegionList;
