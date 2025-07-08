import { supportBanner, supportList } from '../../constant';

import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { Icon, IconName } from '@/components';
import './index.less';
import { scrollToElement } from '@/utils/scroll';

const SupportBannner = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);
  function clickToMore(anchor: string) {
    if (anchor) {
      setTimeout(() => {
        scrollToElement(`HeroEESupport_${anchor}`);
      }, 0);
    }
  }
  return (
    <div className="support-banner">
      {device.isPc ? (
        <img
          className="support-banner__bg"
          src={supportBanner.image.pc}
          alt="banner"
        />
      ) : (
        <img
          className="support-banner__bg"
          src={supportBanner.image.mobile}
          alt="banner"
        />
      )}
      <h1 className="support-banner__title ">{t(supportBanner.title)}</h1>
      <p className="support-banner__desc">{t(supportBanner.description)}</p>

      <div className="support-banner__list">
        {supportList.map((item, index) => (
          <div
            key={index}
            className="support-banner__item"
            onClick={() => clickToMore(item.anchor)}
          >
            {!device.isPc && (
              <img
                className="support-banner__item-img"
                src={item.image}
                alt="item"
              />
            )}
            <Icon
              className="support-banner__item-icon"
              name={item.icon as IconName}
            />
            <h2 className="support-banner__item-title">{t(item.title)}</h2>
            <p className="support-banner__item-desc">{t(item.description)}</p>
            <p className="support-banner__item-more">{t('button.learnMore')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportBannner;
