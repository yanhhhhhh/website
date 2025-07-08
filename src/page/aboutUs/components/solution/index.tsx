import { useTranslation } from 'react-i18next';

import style from './index.module.less';

import { aboutUsSolution } from '@/constants';
import { useLocale } from '@/hooks';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';

const Solution = () => {
  const { t } = useTranslation();
  const { navigateTo } = useLocale();
  const base = useAtomValue(baseConfig);
  return (
    <div
      className={`${base.languageCode ? style[base.languageCode] : ''}  ${
        style.solution
      }`}
    >
      <h1 className={style['solution-title']}>{t(aboutUsSolution.titleKey)}</h1>
      <div className={style['card-container']}>
        {aboutUsSolution.items.map((item, index) => {
          return (
            <div key={index} className={style['card']}>
              <div className={style['card-content']}>
                <h3>{t(item.titleKey)}</h3>
                {item.description.map((desc) => {
                  return <p key={desc.text}>{t(desc.key)}</p>;
                })}
                <button
                  onClick={() => {
                    navigateTo(item.herf);
                  }}
                >
                  {t('button.learnMore')}&gt;
                </button>
              </div>

              <div className={style['card-media']}>
                <img
                  src={
                    base.languageCode == 'zh' ? item.image.zh : item.image.en
                  }
                  alt={item.title}
                />
                {/* <div className={style['card-extra']}>
                  <h3 className={style['card-extra-title']}>
                    {t(item.extraTitleKey)}
                  </h3>
                  <div className={style['card-extra-descs']}>
                    {item.extraDescription.map((desc) => {
                      return <p key={desc.text}>{t(desc.key)}</p>;
                    })}
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Solution;
