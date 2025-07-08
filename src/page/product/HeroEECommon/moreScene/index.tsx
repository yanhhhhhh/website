import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { FC, useMemo } from 'react';

import './index.less';
import MoreSceneCarousel from './moreSceneCarousel';
import MoreSceneMobile from './moreSceneMobile';
interface Props {
  moreScene: {
    title: string;
    description: string;
    mobileDescription: string;
    more?: string;
    images: string[];
    mobileImages: string[];
  };
}
export const HeroEEMoreScene: FC<Props> = ({ moreScene }) => {
  const { device } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    return {
      ...moreScene,
      description: device.isPc
        ? moreScene.description
        : moreScene.mobileDescription,

      backgroundHeight: device.isPc ? '12.5rem' : '15.22rem',
      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '0.5rem',
        alignItems: 'center',
        marginBottom: device.isPc ? '0.74rem' : '0.62rem',
      },
      descriptionStyle: {
        color: device.isPc ? undefined : '#8e8e8e',
      },
      moreType: 'contactUs' as const,
      cardStyle: {
        // paddingRight: device.isPc ? '4.07rem' : 'unset',
        // paddingTop: device.isPc ? '0.57rem' : '0.55rem',
        justifyContent: 'start',
        flexDirection: 'column',
      },
    };
  }, [device.isPc, moreScene]);

  return (
    <div className="HeroEEMoreScene">
      <Card {...props}>
        {device.isPc ? (
          <MoreSceneCarousel images={moreScene.images} />
        ) : (
          <MoreSceneMobile images={moreScene.mobileImages} />
        )}
      </Card>
    </div>
  );
};
