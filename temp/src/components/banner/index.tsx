import React from 'react';
import './index.less';
import LazyLoad from 'react-lazyload';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { LazyLoadWrap } from '..';
interface Banner {
  image: string;
  mobileImage?: string;
  title: string;
  description?: string;
  contentPosition?: 'top' | 'center';
  children?: React.ReactNode;
}
export interface BannerProps extends Banner {}
export default function Banner(props: BannerProps) {
  const {
    image,
    title,
    description,
    contentPosition = 'top',
    mobileImage = image,
  } = props;

  const base = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return (
    <div className="banner">
      <section>
        <LazyLoadWrap>
          <img
            src={base.device.isMobile ? mobileImage : image}
            alt={title}
            className="bg"
          />
        </LazyLoadWrap>
        <div className={[`content`, `${contentPosition}`].join(' ')}>
          <div className="wrap">
            <h3 className="title">{t(title)}</h3>
            {description && <p className="desc">{t(description)}</p>}
          </div>
          {props.children}
        </div>
      </section>
    </div>
  );
}
