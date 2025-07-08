import { Card, CardProps } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { HeroEE2kWhFamilyBackupPower } from '@/constants/production/HeroEE2kWh';
export const HeroEE2FamilyBackupPower = () => {
  const { device, languageCode } = useAtomValue(baseConfig);

  const props = useMemo<CardProps>(() => {
    const getBackgroundImage = () => {
      if (device.isPc) {
        return languageCode == 'en'
          ? HeroEE2kWhFamilyBackupPower.en.image
          : HeroEE2kWhFamilyBackupPower.image;
      } else {
        return languageCode == 'en'
          ? HeroEE2kWhFamilyBackupPower.en.mobileImage
          : HeroEE2kWhFamilyBackupPower.mobileImage;
      }
    };
    return {
      ...HeroEE2kWhFamilyBackupPower,
      backgroundImage: getBackgroundImage(),

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',

      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '1.6rem',
        alignItems: 'center',
        color: '#000',
      },
      descriptionStyle: {
        fontWeight: 450,
      },
    };
  }, [device.isPc, languageCode]);
  return <Card {...props}></Card>;
};
