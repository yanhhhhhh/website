import { HeroEE1kWhIntelligentAPPControl } from '@/constants';
import { useLocale } from '@/hooks';
import { DescriptionItem } from '@/pages/product/HeroEECommon/descriptionItem';
import { useMemo } from 'react';

export const HeroEE1InterlligentAppControl = () => {
  const { localeLangguageCode } = useLocale();
  const intelligentAPPControl = useMemo(() => {
    return {
      ...HeroEE1kWhIntelligentAPPControl,
      image: HeroEE1kWhIntelligentAPPControl[localeLangguageCode].image,
      mobileImage:
        HeroEE1kWhIntelligentAPPControl[localeLangguageCode].mobileImage,
    };
  }, [localeLangguageCode]);
  return <DescriptionItem {...intelligentAPPControl} />;
};
