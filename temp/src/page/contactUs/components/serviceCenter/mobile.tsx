import { Select } from 'antd';
import useMixins from './mixins';
import { contactUsCountry } from '@/constants';
import style from './index.module.less';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks';

const ServiceCenterMo = () => {
  const { t } = useTranslation();

  const { setCountryCode, currentCountry } = useMixins();
  const { localeCountryCode } = useLocale();
  const handleChange = (value: string) => {
    setCountryCode(value);
  };

  const options = useMemo(() => {
    return contactUsCountry?.map((ele) => {
      return {
        label: t(ele.countryTranslate),
        value: ele.countryCode,
      };
    });
  }, [t]);
  useEffect(() => {
    setCountryCode(localeCountryCode);
  }, []);

  return (
    <div className={style['service-center']}>
      <div className={style['service-center__filter']}>
        <Select
          defaultValue={localeCountryCode}
          style={{ width: '100%' }}
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className={style['right']}>
        <h5>{t(currentCountry?.nameTranslate || '')}</h5>
        <ul className={style['desc']}>
          <li>
            <span className={style['desc-label']}>
              {t('contactPage.serviceCenterMail')}
            </span>
            <span className={style['desc-value']}>{currentCountry?.email}</span>
          </li>
          <li>
            <span className={style['desc-label']}>
              {t('contactPage.serviceCenterPhone')}
            </span>
            <span className={style['desc-value']}>{currentCountry?.phone}</span>
          </li>
          {currentCountry?.address && (
            <li>
              <span className={style['desc-label']}>
                {t('contactPage.serviceCenterAddress')}
              </span>
              <span className={style['desc-value']}>
                {t(currentCountry?.address || '')}
              </span>
            </li>
          )}
        </ul>
        <div className={style['left']}>
          <img src={currentCountry?.map} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterMo;
