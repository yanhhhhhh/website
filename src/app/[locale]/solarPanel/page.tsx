// import { Card, CardProps } from '@/components/card';
import { solarPanelBanner } from '@/constants';
import { baseConfig } from '@/stores';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { SolarPanelSeries } from './_components/production';

export const SolarPanelPage = () => {
  // const { device } = useAtomValue(baseConfig);
  // const bannerProps = useMemo<CardProps>(() => {
  //   return {
  //     ...solarPanelBanner,
  //     backgroundImage: device.isPc
  //       ? solarPanelBanner.image
  //       : solarPanelBanner.mobileImage,
  //     fontColor: '#000',
  //     backgroundHeight: device.isPc ? '6rem' : '4rem',
  //     contentStyle: {
  //       marginTop: device.isPc ? '0.3rem' : '0.4rem',
  //     },
  //   };
  // }, [device]);
  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
      }}
    >
      111
      {/* <Card {...bannerProps}></Card> */}
      <SolarPanelSeries></SolarPanelSeries>
    </div>
  );
};
export default SolarPanelPage;
