import { ChildLabelDTOList, LabelObject } from '@/api/label';

import { useLocale } from '@/hooks';
import { useAgreement } from '@/hooks/useAgreement';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface IMenusChildren extends ChildLabelDTOList {
  name: string;
  to: string;
  path: string;
  image?: string;
  isActive?: boolean;
  children?: IMenusChildren[];
}
export interface IMenuItem extends LabelObject {
  name: string;
  to: string;
  path: string;
  image?: string;
  isActive?: boolean;
  children: IMenusChildren[];
}
const agreementKeyMap = {
  privacyPolicy: 'privacy',
  userAgreement: 'users',
};
export const useTemplatNav = () => {
  const [currentClickActiveId, setCurrentClickActiveId] = useState<string>('');

  const { navigateTo, locale } = useLocale();
  const { goToAgreementPage } = useAgreement();
  const location = useLocation();
  const isActived = (item: IMenuItem | IMenusChildren) => {
    if (['privacyPolicy', 'userAgreement'].includes(item.routerCode)) {
      return false;
    }

    // if (item.labelType == 'menu') {
    //   console.log('menu', item);
    // }
    if (item.path === '/') {
      return location.pathname === `/${locale}/`;
    }
    if (item.children == undefined || item.children.length === 0) {
      return (
        location.pathname == `/${locale}/${item.path}` &&
        item.id === currentClickActiveId
      );
    }
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => {
        return (
          child.path !== '' &&
          location.pathname == `/${locale}/${child.path}` &&
          child.id === currentClickActiveId
        );
      });
    }

    return false;
  };

  const goTo = (item: IMenuItem | IMenusChildren) => {
    const param = JSON.parse(item.param ?? '{}');
    console.log('goTo', item);
    if (
      ['bottomPageNav', 'customPage'].includes(item.labelType) &&
      ['privacyPolicy', 'userAgreement'].includes(param?.selectPage)
    ) {
      // 跳转到协议页面
      const path = `/agreement/${
        agreementKeyMap[param?.selectPage as keyof typeof agreementKeyMap]
      }`;
      goToAgreementPage(path);
      return;
    }

    if (item.labelType == 'menu') {
      return;
    }
    if (item.labelType == 'customPage' && item.isLink && item.linkUrl) {
      window.open(item.linkUrl);
      return;
    }

    setCurrentClickActiveId(() => item.id);

    if (!item.children || item.children.length === 0) {
      navigateTo(item.path);
      return;
    }
  };

  return { isActived, goTo };
};
