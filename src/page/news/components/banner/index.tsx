import { CardProps } from '@/components';

import { newsBannerList } from '@/constants';
import { useLocale } from '@/hooks';
import MyCarousel from '@/pages/home/components/carousel';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const NewsBanner = () => {
  const { device } = useAtomValue(baseConfig);
  const { localeLangguageCode } = useLocale();
  const bannerListProps = useMemo<CardProps[]>(() => {
    return newsBannerList.map((item) => {
      const pcImage =
        localeLangguageCode !== 'zh' && item.en ? item.en?.image : item.image;
      const mobileImage =
        localeLangguageCode !== 'zh' && item.en
          ? item.en?.mobileImage
          : item.mobileImage;
      return {
        ...item,
        descriptionInnerHtml: device.isPc ? false : true,
        description: device.isPc ? item.description : item.mobileDescription,
        backgroundImage: device.isPc ? pcImage : mobileImage,
        backgroundHeight: '6rem',
        contentStyle: {
          marginTop: device.isPc ? '0.87rem' : '0.45rem',
          alignItems: device.isPc ? 'center' : 'center',
        },
        titleStyle: {
          fontWeight: 700,
        },
        descriptionStyle: {
          fontWeight: 400,
          fontSize: '0.28rem',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          marginTop: '0.15rem',
        },
        cardStyle: {
          justifyContent: 'center',
        },
      };
    });
  }, [device, localeLangguageCode]);
  return (
    <div className="news-banner">
      <MyCarousel list={bannerListProps} />
    </div>
  );
};
