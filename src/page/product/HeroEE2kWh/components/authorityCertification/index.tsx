import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { HeroEE2kWhAuthorityCertification } from '@/constants/production/HeroEE2kWh';
export const HeroEE2AuthorityCertification = () => {
  const { device } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    return {
      ...HeroEE2kWhAuthorityCertification,
      backgroundImage: device.isPc
        ? HeroEE2kWhAuthorityCertification.image
        : HeroEE2kWhAuthorityCertification.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',

      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '0.6rem',
        alignItems: 'center',
        color: '#000',
      },
      descriptionStyle: {
        color: device.isPc ? '#000' : '#8E8E8E',
      },
    };
  }, [device.isPc]);
  return <Card {...props}></Card>;
};
