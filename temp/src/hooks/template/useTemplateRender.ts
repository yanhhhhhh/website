import { getLabelList } from '@/api/label';
import { RegionCountry } from '@/constants';
import { useSearchParams } from 'react-router-dom';
import { getList } from '@/api/pageManage';
import { useSetAtom } from 'jotai';
import { templateBottomMenuListAtom, templateMenuListAtom } from '@/stores';

export const useTemplateRender = () => {
  const [search] = useSearchParams();
  const setTemplateMenuList = useSetAtom(templateMenuListAtom);
  const setTemplateBottomMenuList = useSetAtom(templateBottomMenuListAtom);
  function getLabelListPromise(element: RegionCountry, type: 'top' | 'bottom') {
    const previewPageId = search.get('preview');
    const setMenuList =
      type === 'top' ? setTemplateMenuList : setTemplateBottomMenuList;

    if (previewPageId) {
      return getLabelList({
        pageId: previewPageId,
        labelSource: type === 'top' ? 1 : 3,
      }).then((res) => {
        const { code: labelCode, data: labelData } = res.data;
        if (labelCode == 200) {
          setMenuList(labelData);
        }
      });
    } else {
      // 现获取发布的页面
      return getList({
        templateGroupIds: element.templateGroupId,
        pageNum: 1,
        pageSize: 10,
        isPublish: 'Y',
      }).then(async (res) => {
        const { code, data } = res.data;
        if (code == 200) {
          if (data.list && data.list.length >= 1) {
            const pageId = data.list[0].id;
            const labelListRes = await getLabelList({
              pageId,
              labelSource: type === 'top' ? 1 : 3,
            });
            const { code: labelCode, data: labelData } = labelListRes.data;
            if (labelCode == 200) {
              setMenuList(labelData);
            }
          } else {
            setMenuList([]);
          }
        }
      });
    }
  }
  /**
   * 切换语言后的后续需要处理的网络请求
   * @param element
   */
  const getTemplateLabelPromise = (element: RegionCountry) => {
    return getLabelListPromise(element, 'top');
  };
  const getTemplateBottomLabelPromise = (element: RegionCountry) => {
    return getLabelListPromise(element, 'bottom');
  };
  return { getTemplateLabelPromise, getTemplateBottomLabelPromise };
};
