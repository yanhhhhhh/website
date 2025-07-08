import { ProductionCard } from '@/components';
import { solarPanelProductions } from '@/constants';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
export const SolarPanelSeries = () => {
  const { t } = useTranslation();
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
