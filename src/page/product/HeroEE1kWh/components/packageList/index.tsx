import { HeroEE1kWhPackageList } from '@/constants';
import { TLanguageCode, useLocale } from '@/hooks';

import { HeroEEPackageList } from '@/pages/product/HeroEECommon/packageList';
import { useMemo } from 'react';
export const HeroEE1kPackageList = () => {
  const { localeLangguageCode } = useLocale();
  const packageList = useMemo(() => {
    return {
      ...HeroEE1kWhPackageList,
      items: HeroEE1kWhPackageList.items.map((item) => {
        return {
          ...item,
          image:
            item[localeLangguageCode as TLanguageCode]?.image ?? item.zh.image,
        };
      }),
    };
  }, [localeLangguageCode]);
  return <HeroEEPackageList packageList={packageList} />;
};
