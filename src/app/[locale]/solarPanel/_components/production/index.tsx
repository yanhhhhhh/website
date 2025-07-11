'use client';

import { ProductionCard } from '@/components/productionCard';
import { solarPanelProductions } from '@/constants/solarPanel';

import styles from './index.module.css';

import { useTranslations } from 'next-intl';

export const SolarPanelSeries = () => {
  const t = useTranslations();

  return (
    <div className={styles['solar-panel-series']}>
      <div className={styles['solar-panel-series-title']}>
        {t('solarPanelPage.solarPanelSeries')}
      </div>
      <div className={styles['solar-panel-series-production']}>
        {solarPanelProductions.map((production, index) => {
          return <ProductionCard {...production} key={index}></ProductionCard>;
        })}
      </div>
    </div>
  );
};
export default SolarPanelSeries;
