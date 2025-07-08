import { Card, CardProps } from '@/components/card';
import { partsBanner } from '@/constants';
import { baseConfig } from '@/stores';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { PartsSeries } from './components/production';
import { AppliancesSeries } from './components/appliancesSeries';
export const PartsPage = () => {
  const { device } = useAtomValue(baseConfig);
  const bannerProps = useMemo<CardProps>(() => {
    return {
      ...partsBanner,
      backgroundImage: device.isPc
        ? partsBanner.image
        : partsBanner.mobileImage,
      fontColor: '#000',
      backgroundHeight: device.isPc ? '6rem' : '4rem',
      contentStyle: {
        marginTop: device.isPc ? '0.3rem' : '0.4rem',
      },
    };
  }, [device]);
  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
      }}
    >
      <Card {...bannerProps}></Card>
      <PartsSeries />
      <AppliancesSeries />
    </div>
  );
};
export default PartsPage;
