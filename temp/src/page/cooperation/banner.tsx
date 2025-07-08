import { Card, CardProps } from '@/components';
import { useMemo } from 'react';

import { cooperationBannner } from './constant';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
export const CooperrationBanner = () => {
  const { device } = useAtomValue(baseConfig);
  const cardProps = useMemo<CardProps>(() => {
    return {
      ...cooperationBannner,
      backgroundImage: device.isPc
        ? cooperationBannner.image.pc
        : cooperationBannner.image.mobile,
      backgroundHeight: device.isPc ? '8rem' : '4.28rem',
      contentStyle: {
        marginTop: device.isPc ? '1.26rem' : '1.06rem',
      },
      titleStyle: {
        fontWeight: 700,
        fontSize: device.isPc ? '0.6rem' : '0.5rem',
        marginBottom: device.isPc ? '0.14rem' : '0.16rem',
      },
      descriptionStyle: {
        fontSize: '0.24rem',
        fontWeight: 400,
      },
    };
  }, [device]);

  return <Card {...cardProps}></Card>;
};
export default CooperrationBanner;
