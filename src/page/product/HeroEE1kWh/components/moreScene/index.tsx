import { HeroEE1kWhMoreScene } from '@/constants';
import { TLanguageCode, useLocale } from '@/hooks';
import { HeroEEMoreScene } from '@/pages/product/HeroEECommon/moreScene';
import { useMemo } from 'react';
export const HeroEE1MoreScene = () => {
  const { localeLangguageCode } = useLocale();
  const moreScene = useMemo(() => {
    return {
      ...HeroEE1kWhMoreScene,
      images: HeroEE1kWhMoreScene[localeLangguageCode as TLanguageCode].images,
      mobileImages:
        HeroEE1kWhMoreScene[localeLangguageCode as TLanguageCode].mobileImages,
    };
  }, [localeLangguageCode]);
  return (
    <div className="HeroEE1MoreScene">
      <HeroEEMoreScene moreScene={moreScene} />
    </div>
  );
};
