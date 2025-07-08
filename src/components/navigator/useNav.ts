import { aboutUsNav } from '@/constants';
import { useLocale } from '@/hooks';
import { useAgreement } from '@/hooks/useAgreement';

import { useLocation } from 'react-router-dom';

export const useNav = () => {
  const location = useLocation();
  const { locale, navigateTo, updatePathsToRoot } = useLocale();
  const { goToAgreementPage } = useAgreement();
  type NavItem = typeof aboutUsNav | ReturnType<typeof updatePathsToRoot>;
  const isActived = (item: NavItem) => {
    if (location.pathname === item.to) {
      return true;
    } else if (item.children) {
      return (
        item.children.some((child) => child.to === location.pathname) ||
        //fix 服务下拉菜单的问题
        item.children.some(
          (child) =>
            `/${locale}${child.to}` === location.pathname + location.hash
        )
      );
    } else if (location.pathname === `/${locale}${item.to}`) {
      //locale匹配
      return true;
    } else if (
      //fix hash
      `${location.pathname}${location.hash}` === `/${locale}${item.to}`
    ) {
      return true;
    }
    return false;
  };

  const goTo = (item: NavItem) => {
    if (item.to.includes('agreement')) {
      goToAgreementPage(item.to);

      return;
    }

    if (item.children == undefined) {
      navigateTo(item.path);
    }
  };

  return { isActived, goTo };
};
