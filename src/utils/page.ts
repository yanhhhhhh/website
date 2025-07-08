import { jsonParse } from '@/utils/serialize';
import { ChildLabelDTOList, LabelObject } from '@/api/label';
import { TLabelContentObject } from '@/api/labelContent';

import { IMenuItem, IMenusChildren } from '@/hooks/template/useTemplatNav';

export function storePageLabelConfigList(
  childLabelDTOList: ChildLabelDTOList[],
  list: ChildLabelDTOList[]
) {
  childLabelDTOList?.forEach((item) => {
    if (item.labelType == 'configPage') {
      list.push(item);
    }

    if (item.childLabelDTOList) {
      storePageLabelConfigList(item.childLabelDTOList, list);
    }
  });
  return list;
}
export function storeTopMenuRouteMap(
  list: IMenuItem[] | IMenusChildren[],
  map: Map<string, IMenuItem | IMenusChildren>
) {
  list?.forEach((item) => {
    if (['customPage', 'configPage'].includes(item.labelType)) {
      map.set(item.labelTemplateDetailId, item);
    }
    if (item.children) {
      storeTopMenuRouteMap(item.children, map);
    }
  });
  return map;
}
export function storePageMenuList(
  LabelObjectList: LabelObject[]
): LabelObject[] {
  return LabelObjectList.filter(
    (label) =>
      ['menu', 'configPage', 'customPage', 'bottomPageNav'].includes(
        label.labelType
      ) && !label.disabled
  ) // Filter by labelType
    .map((label) => ({
      ...label,
      // Recursively process childLabelDTOList for each level
      childLabelDTOList: label.childLabelDTOList
        ? storePageMenuList(label.childLabelDTOList)
        : [],
    }));
}
export function storePageMenuListWithDisable(
  LabelObjectList: LabelObject[]
): LabelObject[] {
  return LabelObjectList.filter((label) =>
    ['menu', 'configPage', 'customPage', 'bottomPageNav'].includes(
      label.labelType
    )
  ) // Filter by labelType
    .map((label) => ({
      ...label,
      // Recursively process childLabelDTOList for each level
      childLabelDTOList: label.childLabelDTOList
        ? storePageMenuListWithDisable(label.childLabelDTOList)
        : [],
    }));
}
export function storeChildLabelDTOList(
  childLabelDTOList: ChildLabelDTOList[],
  map: Map<string, TLabelContentObject>
) {
  childLabelDTOList?.forEach((item) => {
    const { contentJson, ...rest } = item;
    if (rest.labelType === 'configCard') {
      map.set(item.id, {
        ...rest,
        contentJsonParse: jsonParse(contentJson || '{}'),
      });
    }
    if (item.childLabelDTOList) {
      storeChildLabelDTOList(item.childLabelDTOList, map);
    }
  });
  return map;
}
export function getName(
  i18nLabelNameJson: LabelObject['i18nLabelNameJson'],
  getI18nBackEndKey: string
) {
  return i18nLabelNameJson[getI18nBackEndKey] ?? i18nLabelNameJson.zh_cn;
}
function getPath(item: LabelObject) {
  if (item.labelType === 'configPage') {
    return `templateRender/${item.routerCode}/${item.id}`;
  }
  return item.router;
}
export function getPageMenu(
  menu: LabelObject[],
  getI18nBackEndKey: string
): IMenuItem[] {
  return menu.map((item) => {
    return {
      ...item,
      to: item.router,
      path: getPath(item),
      name: getName(item.i18nLabelNameJson, getI18nBackEndKey),
      isActive: false,
      children: item.childLabelDTOList?.map((child) => {
        const param = JSON.parse(child?.param ?? '{}');

        return {
          ...child,
          name: getName(child.i18nLabelNameJson, getI18nBackEndKey),
          isActive: false,
          to: child.router,
          path: getPath(child),
          image: param?.imageOss?.fileUrlProxy,
        };
      }),
    };
  });
}
