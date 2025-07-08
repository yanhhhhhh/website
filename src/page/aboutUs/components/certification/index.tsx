import style from './index.module.less';

import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import { aboutUsCertification, certificationImageText } from '@/constants';
import { Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';

export default function Certification() {
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  return (
    <div
      className={`${base.languageCode ? style[base.languageCode] : ''} ${
        style.certification
      } ${base.languageCode ? style[base.languageCode] : ''}`}
    >
      <section>
        <LazyLoad
          placeholder={
            <div
              style={{
                backgroundColor: '#000',
                height: '800px',
                width: '100vw',
              }}
            >
              <Spin />
            </div>
          }
        >
          <img
            src={
              base.device.isMobile
                ? aboutUsCertification.bgMobileImage
                : aboutUsCertification.bgImage
            }
            alt={aboutUsCertification.title}
            className={style.bg}
          />
        </LazyLoad>
        <div className={style.content}>
          <div className={style.left}>
            <h3 className={style.title}>{t(aboutUsCertification.titleKey)}</h3>
            <p className={style.desc}>
              {t(aboutUsCertification.descriptionKey)}
            </p>
            <div className={style['certification-wrap']}>
              {aboutUsCertification.certification.map((item) => (
                <div className={style.certification} key={item.title}>
                  <h4>{t(item.titleKey)}</h4>
                  <div className={style.element}>
                    <img src={item.image} alt={item.title} key={item.key} />
                    <div className={style['element__descriptions']}>
                      {item.description &&
                        item.description.map((desc) => (
                          <p key={desc}>{desc}</p>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.right}>
            <img
              className={style['right-image']}
              src={aboutUsCertification.image}
              alt={aboutUsCertification.title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
