import { HeroEE1kWhSingleCell } from '@/constants';
import { useLocale } from '@/hooks';
import { HeroEECell } from '@/pages/product/HeroEECommon/cell';
import { useMemo } from 'react';
export const HeroEE1SingleCell = () => {
  const { localeLangguageCode } = useLocale();
  const singleCell = useMemo(() => {
    return {
      ...HeroEE1kWhSingleCell,
      image: HeroEE1kWhSingleCell[localeLangguageCode].image,
      mobileImage: HeroEE1kWhSingleCell[localeLangguageCode].mobileImage,
    };
  }, [localeLangguageCode]);
  return (
    <div className={`HeroEE1SingleCell `}>
      <HeroEECell cell={singleCell} />
    </div>
  );
};
