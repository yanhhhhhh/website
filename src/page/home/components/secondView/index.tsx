import { Card, CardProps } from '@/components/card';
import { homeCollections } from '@/constants';
import Styles from './index.module.less';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { memo, useMemo } from 'react';

const { solarPanel, parts } = homeCollections;
export const HomeSecondView = () => {
  const { device } = useAtomValue(baseConfig);

  const cardProps = useMemo<Record<'solarPanel' | 'parts', CardProps>>(() => {
    const pcStyle = {
      backgroundHeight: '6rem',
      fontColor: '#000000',
      backgroundWidth: '49.5%',
      titleStyle: {},
    };
    const mobileStyle = {
      backgroundHeight: '6rem',
      fontColor: '#000000',
      backgroundWidth: 'unset',
    };
    if (device.isPc) {
      return {
        solarPanel: {
          ...solarPanel,
          ...pcStyle,
          backgroundImage: solarPanel.image,
          hoverAnimaiton: true,
        },
        parts: {
          ...parts,
          ...pcStyle,
          backgroundImage: parts.image,
          hoverAnimaiton: true,
        },
      };
    }
    return {
      solarPanel: {
        ...solarPanel,
        ...mobileStyle,
        backgroundImage: solarPanel.mobileImage,
        cardStyle: {
          marginBottom: '0.2rem',
        },
      },
      parts: {
        ...parts,
        ...mobileStyle,
        backgroundImage: parts.mobileImage,
      },
    };
  }, [device]);
  return (
    <div className={Styles.homeSecondView}>
      <Card {...cardProps.solarPanel}></Card>
      <Card {...cardProps.parts}></Card>
    </div>
  );
};
export default memo(HomeSecondView);
