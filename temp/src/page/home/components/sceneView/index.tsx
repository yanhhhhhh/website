import { useMemoizedFn } from 'ahooks';
import { homeScene } from '@/constants';
import style from './index.module.less';

import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { useLocale, useRegon } from '@/hooks';
import { LazyLoadWrap } from '@/components';
type homeSceneKey = keyof (typeof homeScene)[0];
export default function SceneView() {
  const { regon } = useRegon();
  const { navigateTo } = useLocale();
  const base = useAtomValue(baseConfig);
  const goMoreDetail = useMemoizedFn(() => {
    navigateTo('/product_intro');
  });
  const { t } = useTranslation();

  return (
    <div className={style.homeSceneView}>
      {homeScene.map((item, index) => {
        return (
          <section key={index}>
            <LazyLoadWrap>
              {base.device.isMobile ? (
                <img
                  src={
                    item[('mobile' + regon + 'Image') as homeSceneKey] ??
                    item['mobileZAImage' as homeSceneKey]
                  }
                  alt={item.title}
                  className={style.bg}
                />
              ) : (
                <img
                  src={item[(regon + 'Image') as homeSceneKey]}
                  alt={item.title}
                  className={style.bg}
                />
              )}
            </LazyLoadWrap>
            <div className={style.content}>
              <h3 className={style.title}>{t(item.translation + '.title')}</h3>
              <p
                className={`${style.desc} ${
                  base.languageCode == 'en' ? style.en : ''
                }`}
              >
                {t(item.translation + '.desc')}
              </p>
              <a className={style.more} onClick={goMoreDetail}>
                {t('button.learnMoreInfo')}&gt;
              </a>
            </div>
          </section>
        );
      })}
    </div>
  );
}
