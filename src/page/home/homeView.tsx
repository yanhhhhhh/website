import Styles from './view.module.less';

import { Card, CardProps } from '@/components/card';
import { homeCollections, prowerSupply } from '@/constants';
import { HomeSecondView } from './components/secondView';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { useMemo } from 'react';
import { HomeBanner } from './components/banner';
import { TLanguageCode } from '@/hooks';
const { productions } = homeCollections;

const HomeView = () => {
  const { device, languageCode } = useAtomValue(baseConfig);
  const productionsCardProps = useMemo<CardProps>(() => {
    return {
      ...productions,
      backgroundHeight: device.isPc ? '6rem' : '12.1rem',
      backgroundImage: device.isPc
        ? productions.image
        : productions.mobileImage,
      contentStyle: {
        marginTop: device.isPc ? '1.38rem' : '2rem',
        alignItems: device.isPc ? 'start' : 'center',
      },
      cardStyle: {
        justifyContent: device.isPc ? 'start' : 'center',
        paddingLeft: device.isPc ? '3.76rem' : '0',
      },
      moreStyle: {
        display: 'none',
      },
    };
  }, [device]);
  const prowerSupplyProps = useMemo<CardProps>(() => {
    return {
      ...prowerSupply,
      backgroundHeight: device.isPc ? undefined : '12.1rem',
      backgroundImage: device.isPc
        ? prowerSupply[languageCode as TLanguageCode].image
        : prowerSupply[languageCode as TLanguageCode].mobileImage,
      fontColor: '#000',
      contentStyle: {
        marginTop: device.isPc ? undefined : '2rem',
        alignItems: device.isPc ? 'center' : 'center',
      },
      cardStyle: {
        justifyContent: device.isPc ? 'center' : 'center',
      },
    };
  }, [device.isPc, languageCode]);

  return (
    <div className={Styles.home}>
      {/* banner */}
      <HomeBanner />
      <HomeSecondView />
      <div className={Styles.productions}>
        <Card {...productionsCardProps}></Card>
      </div>
      <div className={Styles.prowerSupply}>
        <Card {...prowerSupplyProps}></Card>
      </div>
    </div>
  );
};

export default HomeView;
