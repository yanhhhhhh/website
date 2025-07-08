import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './index.less';
interface Props {
  cell: {
    title: string;
    description: string;
    secondaryDescription: string;
    image: string;
    mobileImage: string;
    features: {
      title: string;
      icon: string;
    }[];
  };
}
export const HeroEECell: FC<Props> = ({ cell }) => {
  const { device, languageCode } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  const props = useMemo<CardProps>(() => {
    return {
      ...cell,
      backgroundImage: device.isPc ? cell.image : cell.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      contentStyle: {
        marginTop: '0',
        alignItems: device.isPc ? 'start' : 'center',
        marginBottom: device.isPc ? 'unset ' : '0.8rem',
      },
      descriptionStyle: {
        color: device.isPc ? '#fff' : '#8E8E8E',
      },
      cardStyle: {
        paddingLeft: device.isPc ? '4.43rem' : 'unset',
        paddingTop: device.isPc ? '1.47rem' : '0.55rem',
        justifyContent: 'start',
        alignItems: device.isPc ? 'start' : 'center',
        display: 'flex',
        flexDirection: 'column',
      },
    };
  }, [cell, device.isPc]);
  return (
    <div className={`HeroEECell ${languageCode ? languageCode : ''}`}>
      <Card {...props}>
        <div className="secondaryDescription">
          {t(cell.secondaryDescription)}
        </div>

        <div className="features">
          {cell.features.map((item) => {
            return (
              <div className="feature-container" key={item.title}>
                <img src={item.icon} alt={item.title} />
                <h5>{t(item.title)}</h5>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
