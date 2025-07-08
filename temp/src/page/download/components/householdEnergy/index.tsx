import style from './index.module.less';
import { downloadHouseholdEnergyStorage } from '@/constants';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
export const HouseholdEnergy = () => {
  const { t } = useTranslation();
  const { languageCode = 'en' } = useAtomValue(baseConfig);
  return (
    <div className={style.householdEnergy}>
      <h1 className={style.title}>
        {t(downloadHouseholdEnergyStorage.titleKey)}
      </h1>
      <div className={style.desc}>
        {t(downloadHouseholdEnergyStorage.descriptionKey)}
      </div>
      <img
        src={
          languageCode == 'zh'
            ? downloadHouseholdEnergyStorage.image
            : downloadHouseholdEnergyStorage.enImage
        }
        alt={downloadHouseholdEnergyStorage.title}
      />
    </div>
  );
};
export default HouseholdEnergy;
