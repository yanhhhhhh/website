import style from './index.module.less';

import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import { aboutUsBanner } from '@/constants';
import { Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
type BannerProps = (typeof aboutUsBanner)[0];
export default function Banner({
  title,
  titleKey,
  image,
  description,
  mobileImage,
}: BannerProps) {
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  return (
    <div
      className={`${base.languageCode ? style[base.languageCode] : ''}  ${
        style.aboutUsBanner
      }`}
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
            src={base.device.isMobile ? mobileImage : image}
            alt={title}
            className={style.bg}
          />
        </LazyLoad>
        <div className={style.content}>
          <h3 className={style.title}>{t(titleKey)}</h3>
          <div className={style.descWraap}>
            {description.map((item) => (
              <span key={item.key} className={style.desc}>
                {t(item.key)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
