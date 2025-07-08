import { useAtomValue } from 'jotai';
import ContactView from '../components/contactView';

import { baseConfig } from '@/stores';

import contactImage from '@/assets/images/nigeria/7.png';
import contactMobileImage from '@/assets/images/nigeria/mobile/7.png';
import { CardProps } from '@/components';
import {
  nigeriaCarousel,
  nigeriaContact,
  nigeriaScreenFive,
  nigeriaScreenSix,
  nigeriaScreenThree,
} from '@/constants/nigeria';
import { useMemo } from 'react';
import MyCarousel from '../components/carousel';
import VideoView from '../kenya/component/videoView';
import ImageView from '../components/imageView';
import NigeriaScreenTwo from './screenTwo';
export function NigeriaHome() {
  const { device } = useAtomValue(baseConfig);
  const bannerListProps = useMemo<CardProps[]>(() => {
    return nigeriaCarousel.map((item) => {
      return {
        ...item,
        backgroundImage: device.isPc ? item.image : item.mobileImage,
        backgroundHeight: device.isPc ? '8rem' : '12.1rem',
      };
    });
  }, [device]);
  return (
    <div className="nigeria-home">
      <MyCarousel list={bannerListProps} />
      <NigeriaScreenTwo />
      <ImageView
        backgroundImage={
          device.isPc
            ? nigeriaScreenThree.image
            : nigeriaScreenThree.mobileImage
        }
      />
      <VideoView />
      <ImageView
        backgroundImage={
          device.isPc ? nigeriaScreenFive.image : nigeriaScreenFive.mobileImage
        }
      />
      <ImageView
        backgroundImage={
          device.isPc ? nigeriaScreenSix.image : nigeriaScreenSix.mobileImage
        }
      />
      <ContactView
        contactList={nigeriaContact}
        backgroundImage={contactImage}
        mobileBackgroundImage={contactMobileImage}
      />
    </div>
  );
}
export default NigeriaHome;
