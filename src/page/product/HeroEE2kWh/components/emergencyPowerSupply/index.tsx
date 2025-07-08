import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { HeroEE2kWhEmergencyPowerSupply } from '@/constants/production/HeroEE2kWh';
export const HeroEE2EmergencyPowerSupply = () => {
  const { device, languageCode } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    return {
      ...HeroEE2kWhEmergencyPowerSupply,
      backgroundImage: device.isPc
        ? HeroEE2kWhEmergencyPowerSupply.image
        : HeroEE2kWhEmergencyPowerSupply.mobileImage,
      description: device.isPc
        ? HeroEE2kWhEmergencyPowerSupply.description
        : HeroEE2kWhEmergencyPowerSupply.mobileDescription,
      descriptionInnerHtml: device.isPc ? false : true,
      backgroundHeight: device.isPc ? '8rem' : '12.1rem',

      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '0.87rem',
        alignItems: 'center',
        color: '#000',
      },
      descriptionStyle: {
        fontWeight: 450,
        color: device.isPc ? '#000' : '#666666',
        width: device.isPc || languageCode == 'en' ? 'unset' : '5.5rem',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      },
    };
  }, [device.isPc, languageCode]);
  return <Card {...props}></Card>;
};
