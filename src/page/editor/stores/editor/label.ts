import { ChildLabelDTOList, LabelObject } from '@/api/label';
import { ContentJson, TLabelContentObject } from '@/api/labelContent';
import { atom } from 'jotai';
import { storeChildLabelDTOList } from '../../../../utils/page';

export const pageId = atom<string>('');

export const menuLabelListValueAtom = atom<LabelObject[]>([]);
// 编辑页面的标签列表 （configPage）
export const pageLabelConfigListAtom = atom<ChildLabelDTOList[]>([]);
// 子标签列表的 map（只读）
export const pageLabelConfigJsonMapAtom = atom((get) => {
  const map = new Map<string, TLabelContentObject>();
  const pageLabelConfigListValue = get(pageLabelConfigListAtom);
  pageLabelConfigListValue.forEach((item) => {
    storeChildLabelDTOList(item.childLabelDTOList, map);
  });

  return map;
});
// 当前选中的标签(页面 二级标签)
export const currentLabelDataAtom = atom<LabelObject | null>((get) => {
  const pageLabelConfigListValue = get(pageLabelConfigListAtom);
  const currentLabelId = get(currentLabelIdAtom);
  const current =
    pageLabelConfigListValue?.find((item) => item.id === currentLabelId) ||
    null;

  return current;
});
export const currentLabelIdAtom = atom<string | null>(null);
// 当前选中的子标签（第几屏卡片）
export const currentChildLabelDataAtom = atom<ChildLabelDTOList | null>(
  (get) => {
    const currentChildLabelId = get(currentChildLabelIdAtom);
    const currentLabelData = get(currentLabelDataAtom);
    return (
      currentLabelData?.childLabelDTOList?.find(
        (item) => item.id === currentChildLabelId
      ) || null
    );
  }
);
export const currentChildLabelIdAtom = atom<string | null>(null);
// 更新函数标签列表|子标签列表（ 只写）
export const updatePageLabelConfigAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: ContentJson | undefined }) => {
    const pageLabelConfigListValue = get(pageLabelConfigListAtom);
    const map = new Map(get(pageLabelConfigJsonMapAtom)); // 获取当前的 map 并创建一个新的
    const updateLabelCache = get(updateLabelCacheAtom);
    const preData = map.get(id);
    if (!preData) {
      console.error('pageLabelConfigJsonMapAtom', '未找到对应的数据');
      return;
    }
    // 更新 map
    if (data) {
      map.set(id, {
        ...preData,
        contentJsonParse: data,
      });
      updateLabelCache.set(id, data);
    } else {
      map.set(id, {} as TLabelContentObject);
      updateLabelCache.set(id, {} as ContentJson);
    }

    // 更新缓存

    // 更新列表中的对应数据
    const updatedPageLabelConfigListValue = pageLabelConfigListValue.map(
      (item) => ({
        ...item,
        childLabelDTOList: item.childLabelDTOList.map((childItem) => {
          if (childItem.id === id) {
            return {
              ...childItem,
              contentJson: JSON.stringify(data),
            };
          }
          return childItem;
        }),
      })
    );
    set(pageLabelConfigListAtom, updatedPageLabelConfigListValue);
  }
);

// 记录已经编辑过的标签内容 用于之后一次保存
export const updateLabelCacheAtom = atom(new Map<string, ContentJson>());
export const needDeleleI18bIdsCacheAtom = atom<string[]>([]);
export const needDeleleOssFileIdsCacheAtom = atom<string[]>([]);
