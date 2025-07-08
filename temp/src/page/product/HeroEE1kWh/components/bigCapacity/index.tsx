import { Card, CardProps } from '@/components';

import { HeroEE1kWhBigCapacity } from '@/constants';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import './index.less';
import { TLanguageCode } from '@/hooks';
export const HeroEE1BigCapacity = () => {
  const { device, languageCode } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  const props = useMemo<CardProps>(() => {
    return {
      ...HeroEE1kWhBigCapacity,
      backgroundImage: device.isPc
        ? HeroEE1kWhBigCapacity[languageCode as TLanguageCode].image
        : HeroEE1kWhBigCapacity[languageCode as TLanguageCode].mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      contentStyle: {
        marginTop: '0',
        alignItems: device.isPc ? 'end' : 'center',
      },
      descriptionStyle: {
        color: device.isPc ? '#fff' : '#8E8E8E',
      },
      cardStyle: {
        paddingRight: device.isPc ? '4.07rem' : 'unset',
        paddingTop: device.isPc ? '0.57rem' : '0.55rem',
        justifyContent: device.isPc ? undefined : 'start',
        alignItems: device.isPc ? 'end' : 'center',
        display: 'flex',
        flexDirection: 'column',
      },
    };
  }, [device, languageCode]);
  return (
    <div className={`HeroEE1BigCapacity ${languageCode ? languageCode : ''}`}>
      <Card {...props}>
        <div className="devices">
          {HeroEE1kWhBigCapacity.devices.map((item) => {
            return (
              <div className="device-container" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="device-container-bottom">
                  <h5>{t(item.title)}</h5>
                  <p>{t(item.description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
