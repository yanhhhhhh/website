import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { HeroEE2kWhIntelligentAPPControl } from '@/constants/production/HeroEE2kWh';
export const HeroEE2IntelligentAPPControl = () => {
  const { device, languageCode } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    return {
      ...HeroEE2kWhIntelligentAPPControl,
      backgroundImage: device.isPc
        ? languageCode !== 'en'
          ? HeroEE2kWhIntelligentAPPControl.image
          : HeroEE2kWhIntelligentAPPControl.en.image
        : languageCode !== 'en'
        ? HeroEE2kWhIntelligentAPPControl.mobileImage
        : HeroEE2kWhIntelligentAPPControl.en.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      cardStyle: {
        justifyContent: device.isPc ? 'start' : 'center',
        paddingLeft: device.isPc ? '4.4rem' : '0',
      },
      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '0.3rem',
        alignItems: device.isPc ? 'start' : 'center',
        color: device.isPc ? '#000' : '#fff',
        padding: languageCode == 'en' ? ' 0 1rem' : '0',
      },
      descriptionStyle: {
        fontWeight: 300,
      },
    };
  }, [device.isPc, languageCode]);
  return <Card {...props}></Card>;
};
