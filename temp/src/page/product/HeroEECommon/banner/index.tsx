import { Card } from '@/components';

import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { FC, useMemo } from 'react';
interface Props {
  banner: {
    title: string;
    description: string;
    image: string;
    mobileImage: string;
    more?: string;
  };
}
export const HeroEEBanner: FC<Props> = ({ banner }) => {
  const { device } = useAtomValue(baseConfig);

  const bannerProps = useMemo(() => {
    return {
      ...banner,
      backgroundImage: device.isPc ? banner.image : banner.mobileImage,

      backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      contentStyle: {
        marginTop: device.isPc ? '0.7rem' : '1.3rem',
        alignItems: 'center',
      },
      moreType: 'contactUs' as const,
    };
  }, [banner, device.isPc]);
  return <Card {...bannerProps}></Card>;
};
