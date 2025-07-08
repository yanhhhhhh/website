import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { HeroEE2kWhNoWorryPowerSupply } from '@/constants/production/HeroEE2kWh';
export const HeroEE2NoWorryPowerSupply = () => {
  const { device } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    return {
      ...HeroEE2kWhNoWorryPowerSupply,
      backgroundImage: device.isPc
        ? HeroEE2kWhNoWorryPowerSupply.image
        : HeroEE2kWhNoWorryPowerSupply.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',

      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '1.6rem',
        alignItems: 'center',
        color: '#000',
      },
      // titleStyle:{

      // },
      descriptionStyle: {
        fontWeight: 450,
      },
    };
  }, [device.isPc]);
  return <Card {...props}></Card>;
};
