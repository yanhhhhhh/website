import { useTranslation } from 'react-i18next';
import './index.less';

import { FC, useMemo } from 'react';
import { useLocale } from '@/hooks';
interface Props {
  packageList: {
    title: string;
    items: {
      title: string;
      image: string;
      description?: string;
    }[];
    more?: string;
  };
}
export const HeroEEPackageList: FC<Props> = ({ packageList }) => {
  const { t } = useTranslation();

  return (
    <div className="HeroEEPackageList">
      <div className="wrapper">
        <div className="title">{t(packageList.title)}</div>
        {packageList.more && (
          <a
            className="more"
            href={packageList.more}
            target="_blank"
            rel="noreferrer"
          >
            {t('button.contactUs')}&gt;
          </a>
        )}
        <div className="package-list">
          {packageList.items.map((item) => {
            return (
              <div
                className="package-item"
                key={item.title}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <p>{t(item.title)}</p>
                {/* <img src={item.image} alt={item.title} /> */}
                {item?.description && (
                  <div className="description">{t(item.description)}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
