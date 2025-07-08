import { LabelObject } from '@/api/label';
import { templateBottomMenuListAtom, templateMenuListAtom } from '@/stores';
import {
  getPageMenu,
  storePageMenuList,
  storePageMenuListWithDisable,
  storeTopMenuRouteMap,
} from '@/utils/page';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useLocale } from '@/hooks';
import { IMenuItem, IMenusChildren } from './useTemplatNav';
// 递归填充route和routerCode 为topMenuRouteMap的route 用于路由跳转
function templateBottomWithRoute(
  templateBottomMenuList: LabelObject[],
  topMenuRouteMap: Map<string, IMenuItem | IMenusChildren>
): LabelObject[] {
  return templateBottomMenuList.map((item) => {
    const param = JSON.parse(item?.param ?? '{}');
    const relatedTopMenuId = param?.relatedTopMenuId ?? '';

    if (relatedTopMenuId) {
      const topRoute = topMenuRouteMap.get(relatedTopMenuId);

      if (topRoute) {
        // Recursively process the childLabelDTOList if it exists
        const updatedChildren = item.childLabelDTOList
          ? templateBottomWithRoute(item.childLabelDTOList, topMenuRouteMap)
          : [];

        // Return the updated item with routerCode, router, and updated children
        return {
          ...item,
          routerCode: topRoute.routerCode,
          router: topRoute.path,
          path: topRoute.path,
          param: topRoute.param,
          childLabelDTOList: updatedChildren,
        };
      } else {
        console.error(
          `No matching top route found for relatedTopMenuId: ${relatedTopMenuId}`
        );
      }
    }

    // If no relatedTopMenuId or no matching top route, return the item as is
    return {
      ...item,
      childLabelDTOList: item.childLabelDTOList
        ? templateBottomWithRoute(item.childLabelDTOList, topMenuRouteMap)
        : [],
      children: item.childLabelDTOList,
    };
  });
}

export const useTemplateMenu = () => {
  const templateMenuList = useAtomValue(templateMenuListAtom);
  const templateBottomMenuList = useAtomValue(templateBottomMenuListAtom);
  const { getI18nBackEndKey } = useLocale();
  const topMenu = useMemo(() => {
    const menu = storePageMenuList(templateMenuList);
    return getPageMenu(menu, getI18nBackEndKey);
  }, [getI18nBackEndKey, templateMenuList]);

  const topMenuWithDisable = useMemo(() => {
    const menu = storePageMenuListWithDisable(templateMenuList);

    return getPageMenu(menu, getI18nBackEndKey);
  }, [getI18nBackEndKey, templateMenuList]);

  const topMapWithDisable = useMemo(() => {
    const map = storeTopMenuRouteMap(topMenuWithDisable, new Map());
    return map;
  }, [topMenuWithDisable]);
  const bottomMenu = useMemo(() => {
    if (topMapWithDisable.size === 0) return [];
    const newBottomMenu = templateBottomWithRoute(
      templateBottomMenuList,
      topMapWithDisable
    );
    const menu = storePageMenuList(newBottomMenu);
    return getPageMenu(menu, getI18nBackEndKey);
  }, [getI18nBackEndKey, templateBottomMenuList, topMapWithDisable]);

  return {
    templateMenuList,
    topMenu,
    bottomMenu,
  };
};
