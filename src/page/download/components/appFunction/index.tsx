import { useTranslation } from 'react-i18next';
import style from './index.module.less';
import { downloadAppFunction } from '@/constants';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import MyCarousel from '../carousel';
export const AppFunction = () => {
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  const { device, languageCode = 'en' } = base;
  return (
    <div
      className={style.appFunction}
      style={{
        backgroundImage: `url(${downloadAppFunction.bgImage})`,
      }}
    >
      <h1 className={style.title}> {t(downloadAppFunction.titleKey)} </h1>
      {device.isMobile ? (
        <MyCarousel
          centerMode={true}
          dots={
            {
              // className: 'custom-dots',
            }
          }
        >
          {downloadAppFunction.items.map((item) => (
            <div className={style['item-container']} key={item.title}>
              <div className={style.item} key={item.title}>
                <h4 className={style['item-title']}>{t(item.titleKey)}</h4>
                {item.description.map((desc) => (
                  <p className={style['item-desc']} key={desc.text}>
                    {t(desc.key)}
                  </p>
                ))}
                <img
                  className={style['item-image']}
                  src={languageCode == 'zh' ? item.image : item.enImage}
                  alt={item.title}
                />
              </div>
            </div>
          ))}
        </MyCarousel>
      ) : (
        <div className={style.content}>
          {downloadAppFunction.items.map((item) => (
            <div className={style.item} key={item.title}>
              <h4 className={style['item-title']}>{t(item.titleKey)}</h4>
              {item.description.map((desc) => (
                <p className={style['item-desc']} key={desc.text}>
                  {t(desc.key)}
                </p>
              ))}
              <img
                className={style['item-image']}
                src={languageCode == 'zh' ? item.image : item.enImage}
                alt={item.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppFunction;
