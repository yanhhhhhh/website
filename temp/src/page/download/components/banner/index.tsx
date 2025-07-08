import { Icon, LazyLoadWrap } from '@/components';
import style from './index.module.less';

import { downloadBanner } from '@/constants';
import { modal } from '@/providers';
import { baseConfig } from '@/stores';
import { AndroidFilled, AppleFilled, WarningFilled } from '@ant-design/icons';

import { useLocale } from '@/hooks';
import { scrollToElement } from '@/utils/scroll';
import { useAtomValue } from 'jotai';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './modal.less';

export function Banner() {
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  const { device, languageCode = 'en' } = base;
  const { navigateTo } = useLocale();
  const openModal = () => {
    const instance = modal.info({
      centered: true,
      className: 'coming-soon-modal',
      icon: null,
      width: base.device.isPc ? 280 : '4.66rem',
      closable: true,
      maskClosable: true,
      okButtonProps: { style: { display: 'none' } },
      content: (
        <div className="coming-soon-modal-wrapper">
          <Icon name="image-smile" className="coming-soon-modal-icon"></Icon>
          <p className="coming-soon-modal-text"> {t('contact.comingSoon')}</p>
        </div>
      ),
    });
    return instance;
  };
  const appImage = useMemo(() => {
    const imageMap = device.isMobile
      ? downloadBanner.image.mobile
      : downloadBanner.image.pc;
    return imageMap[languageCode as 'en' | 'zh'];
  }, [device, languageCode]);
  function scrollToAnchor() {
    scrollToElement('HeroEEDownload_manual');
  }
  return (
    <div
      className={`${style.downloadBanner} ${
        base.languageCode ? style[base.languageCode] : ''
      }`}
    >
      <section>
        <LazyLoadWrap>
          <img
            src={downloadBanner.bgImage}
            alt={downloadBanner.title}
            className={style.bg}
          />
        </LazyLoadWrap>
        <div className={style.content}>
          <div className={style.left}>
            <h3 className={style.title}>{t(downloadBanner.titleKey)}</h3>
            {downloadBanner.description.map((desc) => (
              <p className={style.desc} key={desc.text}>
                {t(desc.key)}
              </p>
            ))}
            <div className={style.tip}>
              <WarningFilled
                className={style.icon}
                style={{
                  color: '#FCC403',
                }}
              />
              <span>{t('downloadPage.appHeroSETip')}</span>
            </div>

            <div className={style.certification}>
              {downloadBanner.downloads.map((item) =>
                item.type === 'link' ? (
                  <a
                    key={item.text}
                    className={style.button}
                    // href={item.herf}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    onClick={openModal}
                  >
                    {item.iconKey === 'android' ? (
                      <AndroidFilled className={style.icon} />
                    ) : (
                      <AppleFilled className={style.icon} />
                    )}

                    {t(item.key)}
                  </a>
                ) : (
                  <a
                    key={item.text}
                    className={style.anchor}
                    onClick={() => {
                      navigateTo(item.herf);
                      scrollToAnchor();
                    }}
                    // target="_blank"
                    // rel="noopener noreferrer"
                  >
                    {t(item.key)}
                  </a>
                )
              )}
              {/* <Anchor
              style={{ color: '#fff' }}
              items={[
                {
                  key: 'downloadBanner',
                  title: '下载',
                  href: '#downloadManual',
                },
              ]}
            /> */}
            </div>
          </div>
        </div>

        {/* <Icon name="image-download-banner2" className={style.right}></Icon> */}
        <img
          className={style.right}
          src={appImage}
          alt={downloadBanner.title}
        />
      </section>
    </div>
  );
}
export default memo(Banner);
