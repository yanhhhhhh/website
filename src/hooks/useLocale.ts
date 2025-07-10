'use client';
import { RegionCountry, otherThirdLinks } from '@/constants';

import { baseConfig, isShowRegion, templateId } from '@/stores';
import i18n from '@/utils/language/i18nConfig';

import { getExampleTypeDict } from '@/api/case';

import { thirdLinks } from '@/constants';

import { isShowMobileNav } from '@/stores';
import { exampleTypeAtom } from '@/stores/case';

import { message } from '@/providers';
import { globalLoadingAtom } from '@/stores/global';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

import { useHeroNavigate } from './useHeroNavigate';
import { useTemplateRender } from './template/useTemplateRender';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const defaultLocale = 'zh_CN';
export type TLanguageCode = 'zh' | 'en';
export const useLocale = () => {
  const { locale } = useParams<{ locale: string }>();

  const pathname = usePathname();
  const navigate = useRouter();
  const [base, setBase] = useAtom(baseConfig);
  const setIsShowMobileNav = useSetAtom(isShowMobileNav);
  const setIsShowRegion = useSetAtom(isShowRegion);
  const setTemplateId = useSetAtom(templateId);
  const setExampleType = useSetAtom(exampleTypeAtom);
  const setGlobalLoading = useSetAtom(globalLoadingAtom);
  const { getPath, navigateTo, updatePathsToRoot } = useHeroNavigate();
  const { getTemplateLabelPromise, getTemplateBottomLabelPromise } =
    useTemplateRender();

  // 点击语言图标
  const chickLanguageIcon = useCallback(() => {
    // 部分界面优瞄点，需要移除hash，避免页面自动滚动到锚点位置
    if (window.location.hash) {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
    if (base.device.isPc) {
      setIsShowRegion((pre) => {
        document.body.style.overflowY = pre ? 'auto' : 'hidden';
        return !pre;
      });
    } else {
      //fix: 点击语言图标，关闭手机端导航栏
      setIsShowMobileNav(false);
      if (pathname.includes('/region')) navigate.back();

      navigateTo('/region');
    }
  }, [base.device.isPc, pathname, navigate, navigateTo]);

  const initLanguageFetch = useCallback(
    async (element: RegionCountry, finallyCallback?: () => void) => {
      if (!element.templateGroupId) {
        console.error('templateGroupId is not exist');
        message.error('templateGroupId is not exist');
      } else {
        setTemplateId(element.templateGroupId);
      }
      console.log('templateGroupId', element.templateGroupId);
      console.log('获取菜单列表');
      const PromiseList = [
        getTemplateLabelPromise(element), // 获取顶部菜单,
        getTemplateBottomLabelPromise(element), // 获取底部菜单
        // getExampleTypeDict().then((res) => {
        //   const { code, data } = res.data;

        //   if (code == 200) {
        //     setExampleType(data);
        //   }
        // }),
      ];
      setGlobalLoading(true);
      await Promise.allSettled(PromiseList)
        .then(() => {
          console.log('获取菜单列表成功');
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          finallyCallback && finallyCallback();
          setGlobalLoading(false);
        });
    },
    []
  );

  // 切换语言后的后续处理
  const changeLanguagePostProcessor = useCallback(
    async (element: RegionCountry) => {
      const { locale: newLocale, i18n: i18nKey } = element;

      i18n.changeLanguage(i18nKey);

      setBase((pre) => {
        return {
          ...pre,
          language: i18nKey,
          ...element,
        };
      });

      //手机端切换语言后，跳转到之前的页面（手机端选择语言使用新的路由）
      // let path = base.device.isMobile
      //   ? location.state?.from || '/'
      //   : location.pathname;
      // const search = decodeURI(
      //   base.device.isMobile ? location.state?.search : location.search
      // );

      // if (!locale) {
      //   path = `${path}${search}`.replace('', `/${newLocale}`);
      // } else {
      //   path = `${path}${search}`.replace(`/${locale}`, `/${newLocale}`);
      // }
      const homePath = `/${newLocale}/`;
      // await initLanguageFetch(element, () => {
      //   if (path.includes('/detail')) {
      //     // Fix ：如果是详情页，切换语言后，跳转到新闻列表页面
      //     navigateTo('/aboutUs/news');
      //   } else {
      //     // navigate(path);
      //     // Fix: 切换语言后，跳转到首页
      //     navigate.push(homePath);
      //   }
      // });
      navigate.push(homePath);
    },
    [
      setBase,
      base.device.isMobile,
      // location.state?.from,
      // location.state?.search,
      // location.pathname,
      // location.search,
      locale,
      initLanguageFetch,
      navigateTo,
      navigate,
    ]
  );

  const localeLangguageCode = useMemo(() => {
    return (locale?.split('_')[0] ||
      defaultLocale.split('_')[0]) as TLanguageCode;
  }, [locale]);
  const localeCountryCode = useMemo(() => {
    return locale?.split('_')[1] || defaultLocale.split('_')[1];
  }, [locale]);
  const getI18nBackEndKey = useMemo(() => {
    // 暂时只支持中文和英文
    if (!locale?.toLowerCase()) {
      return defaultLocale.toLowerCase();
    }
    if (locale?.toLowerCase() == 'zh_cn') {
      return locale?.toLowerCase();
    } else {
      return 'en_us';
    }
  }, [locale]);
  const thirdLinksAndOther = useMemo(() => {
    const country = localeCountryCode;
    const otherLinks =
      otherThirdLinks[country as keyof typeof otherThirdLinks] || [];
    // 如果是中国,不显示Titok、Facebook、Twitter、Instagram
    if (country == 'CN') return [...otherLinks];
    if (otherLinks.length != 0) return [...otherLinks];
    return [...thirdLinks];
  }, [localeCountryCode]);

  return {
    locale,
    thirdLinksAndOther,
    navigateTo,
    getPath,
    navigate,
    changeLanguagePostProcessor,
    chickLanguageIcon,
    updatePathsToRoot,
    localeLangguageCode,
    localeCountryCode,
    initLanguageFetch,
    getI18nBackEndKey,
  };
};
