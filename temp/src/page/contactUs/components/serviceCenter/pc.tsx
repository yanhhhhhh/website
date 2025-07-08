import { Button, Flex } from 'antd';
import useMixins from './mixins';
import { contactUsCountry } from '@/constants';
import style from './index.module.less';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocale } from '@/hooks';

const ServiceCenterPc = () => {
  const { t } = useTranslation();

  const { countryCode, setCountryCode, onAreaClick, currentCountry } =
    useMixins();
  const { localeCountryCode } = useLocale();
  // 初始化同步国家码
  useEffect(() => {
    setCountryCode(localeCountryCode);
  }, []);
  return (
    <div className={style['service-center']}>
      <Flex
        wrap="wrap"
        gap="small"
        justify="space-between"
        className={style['service-center__filter']}
      >
        {contactUsCountry.map((item) => (
          <Button
            className={style['filter-btn']}
            type={item.countryCode == countryCode ? 'primary' : 'default'}
            key={item.uuid}
            onClick={() => onAreaClick(item)}
          >
            {t(item.countryTranslate)}
          </Button>
        ))}
      </Flex>

      <Flex justify="flex-start" className={style['service-center__info']}>
        <div className={style['left']}>
          <img src={currentCountry?.map} />
        </div>
        <div className={style['right']}>
          <h5>{t(currentCountry?.nameTranslate || '')}</h5>
          <ul className={style['desc']}>
            <li>
              <span className={style['desc-label']}>
                {t('contactPage.serviceCenterMail')}
              </span>
              <span className={style['desc-value']}>
                {currentCountry?.email}
              </span>
            </li>
            <li>
              <span className={style['desc-label']}>
                {t('contactPage.serviceCenterPhone')}
              </span>
              <span className={style['desc-value']}>
                {currentCountry?.phone}
              </span>
            </li>
            {currentCountry?.address && (
              <li>
                <span className={style['desc-label']}>
                  {t('contactPage.serviceCenterAddress')}
                </span>
                <span className={style['desc-value']}>
                  {t(currentCountry?.address ?? '')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </Flex>
    </div>
  );
};

export default ServiceCenterPc;
