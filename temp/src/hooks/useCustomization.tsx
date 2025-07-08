import {
  EnCountryPhone,
  globalEmail,
  homeNav,
  kenyaEmail,
  kenyaMobileNavList,
  kenyaPhone,
  kenyaServiceNav,
  mobileNavList,
  other,
  serviceNav,
} from '@/constants';
import { kenyaRouters, routers } from '@/router';
import { useMemo } from 'react';
import { useLocale } from './useLocale';
import { nigeriaPhone } from '@/constants/nigeria';

// 肯尼亚定制化
export const useCustomization = () => {
  const { locale } = useLocale();
  const customizationMap = useMemo(() => {
    return {
      en_KE: {
        routers: kenyaRouters,
        serviceNav: kenyaServiceNav,
        mobileNavList: kenyaMobileNavList,
        pcFooterNav: kenyaMobileNavList,
        phone: kenyaPhone,
        email: kenyaEmail,
      },
      en_NG: {
        routers,
        serviceNav,
        mobileNavList: [homeNav, ...mobileNavList],
        pcFooterNav: mobileNavList,
        phone: nigeriaPhone,
        email: globalEmail,
      },
      zh_CN: {
        routers,
        serviceNav,
        mobileNavList: [homeNav, ...mobileNavList],
        pcFooterNav: mobileNavList,
        phone: other.phone,
        email: globalEmail,
      },
      default: {
        routers,
        serviceNav,
        mobileNavList: [homeNav, ...mobileNavList],
        pcFooterNav: mobileNavList,
        phone: EnCountryPhone,
        email: globalEmail,
      },
    };
  }, []);
  const currentCustomization = useMemo(() => {
    return (
      customizationMap[
        (locale ?? 'defalut') as keyof typeof customizationMap
      ] ?? customizationMap.default
    );
  }, [customizationMap, locale]);
  const navigatorRouter = useMemo(() => {
    return currentCustomization.routers;
  }, [currentCustomization]);
  const customServiceNav = useMemo(() => {
    return currentCustomization.serviceNav;
  }, [currentCustomization]);
  const customMobileNavList = useMemo(() => {
    return currentCustomization.mobileNavList;
  }, [currentCustomization]);
  const customPcFooterNav = useMemo(() => {
    return currentCustomization.mobileNavList;
  }, [currentCustomization]);
  const customServiceHotline = useMemo(() => {
    return currentCustomization.phone;
  }, [currentCustomization]);
  const customEmail = useMemo(() => {
    return currentCustomization.email;
  }, [currentCustomization]);
  const customService = useMemo(() => {
    return currentCustomization.serviceNav;
  }, [currentCustomization]);
  return {
    navigatorRouter,
    currentCustomization,
    customServiceNav,
    customMobileNavList,
    customPcFooterNav,
    customServiceHotline,
    customEmail,
    customService,
  };
};
