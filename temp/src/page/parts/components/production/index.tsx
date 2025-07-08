import { ProductionCard } from '@/components';
import { partsProductions } from '@/constants';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
export const PartsSeries = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['parts-series']}>
      <div className={styles['parts-series-title']}>
        {t('partsPage.partsSeries')}
      </div>
      <div className={styles['parts-series-production']}>
        {partsProductions.map((production, index) => {
          return <ProductionCard {...production} key={index}></ProductionCard>;
        })}
      </div>
    </div>
  );
};
