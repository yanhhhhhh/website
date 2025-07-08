import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { PropsWithChildren } from 'react';
import './index.less';
import { useTranslation } from 'react-i18next';
interface DescriptionItemProps extends PropsWithChildren {
  title: string;
  description?: string;
  image?: string;
  mobileImage?: string;
  descriptionChildren?: React.ReactNode;
}
export const DescriptionItem = (props: DescriptionItemProps) => {
  const {
    title,
    description,
    children,
    image,
    mobileImage,
    descriptionChildren,
  } = props;
  const { device } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return (
    <div className="description-item-wrapper">
      <div className="description-item-content">
        <div className="description-item-title">{t(title)}</div>
        {!descriptionChildren && description && (
          <div className="description-item-description">{t(description)}</div>
        )}
        {descriptionChildren && descriptionChildren}
        {(image || mobileImage) && (
          <img
            src={device.isPc ? image : mobileImage}
            className="description-item-image"
          />
        )}
        {children}
      </div>
    </div>
  );
};
