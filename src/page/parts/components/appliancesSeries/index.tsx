import { ProductionCard } from '@/components';
import { appliancesSeries, appliancesSeriesStyle } from '@/constants';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
export const AppliancesSeries = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);

  const appliances = useMemo(() => {
    return appliancesSeries.map((appliance) => {
      return {
        ...appliance,
        titleStyle: {
          fontSize: device.isPc ? '0.24rem' : '0.32rem',
        },
        cardStyle: {
          ...(device.isPc
            ? appliancesSeriesStyle.pc
            : appliancesSeriesStyle.mobile),
          paddingLeft: device.isPc ? '0.2rem' : '0.15rem',
          paddingRight: device.isPc ? '0.2rem' : '0.15rem',
          marginBottom: '0.2rem',
        },
        imageStyle: {
          ...(device.isPc
            ? appliancesSeriesStyle.pc
            : appliancesSeriesStyle.mobile),
        },
      };
    });
  }, [device]);
  return (
    <div className={styles['appliances-series']}>
      <div className={styles['appliances-series-title']}>
        {t('partsPage.applianceSeries')}
      </div>
      <div className={styles['appliances-series-production']}>
        {appliances.map((production, index) => {
          return <ProductionCard {...production} key={index}></ProductionCard>;
        })}
      </div>
    </div>
  );
};
