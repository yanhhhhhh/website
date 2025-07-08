import { Card } from '@/components';

import { HeroEE1kWhOutdoorLeisure } from '@/constants';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
export const HeroEE1OutdoorLeisure = () => {
  const { device } = useAtomValue(baseConfig);

  const props = useMemo(() => {
    return {
      ...HeroEE1kWhOutdoorLeisure,
      backgroundImage: device.isPc
        ? HeroEE1kWhOutdoorLeisure.image
        : HeroEE1kWhOutdoorLeisure.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      contentStyle: {
        marginTop: device.isPc ? '0.92rem' : '0.96rem',
        alignItems: device.isPc ? 'start' : 'center',
        paddingLeft: device.isPc ? '5.2rem' : undefined,
      },
      cardStyle: {
        justifyContent: device.isPc ? 'start' : 'center',
      },
    };
  }, [device]);
  return <Card {...props}></Card>;
};
