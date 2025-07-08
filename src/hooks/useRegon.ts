import {
  AfricaCountryCode,
  SoutheastAsiaCountryCode,
  southernAsiaCountryCode,
} from '@/constants';
import { useMemo } from 'react';

import { useLocale } from '.';

export const useRegon = () => {
  const { locale } = useLocale();
  const regon = useMemo(() => {
    if (!locale || AfricaCountryCode.includes(locale)) {
      return 'ZA';
    }

    if (locale === 'zh_CN' || locale === 'zh_TW' || locale === 'zh_HK') {
      return 'CN';
    }
    //非洲
    if (
      locale === 'sw_KE' ||
      locale === 'sw_TZ' ||
      locale === 'en_NG' ||
      locale === 'en_ZA'
    ) {
      return 'ZA';
    }
    // 东南亚
    if (SoutheastAsiaCountryCode.includes(locale)) {
      return 'SEA';
    }
    if (southernAsiaCountryCode.includes(locale)) {
      return 'SA';
    }
    //没有先用中国
    return 'CN';
  }, [locale]);
  return { locale, regon };
};
