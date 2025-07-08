import {
  getKnowledgeList,
  getKnowledgeSelectorType,
  getProductType,
  LangContentRespList,
  TSelectorType,
} from '@/api/support';
import { useLocale } from '@/hooks';
import { useEffect, useState } from 'react';

import {
  classificationGroupBylocale,
  groupByLocaleAndClassification,
} from './utils';

interface IProps {
  type: number;
  pageSize?: number;
  searchWithClassification?: boolean;
}
export const useSalesKnowledgeBase = ({
  type,
  pageSize = 10,
  searchWithClassification = true,
}: IProps) => {
  const [leftList, setLeftList] = useState<string[]>([]);
  const [currentActiveLeftKey, setCurrentActiveLeftKey] = useState<string>('');
  // 左侧按照语言分类的类型
  const [langSelector, setLangSelector] = useState<Record<string, string[]>>();
  const [classificationMap, setClassificationMap] =
    useState<Record<string, Record<string, LangContentRespList[]>>>();
  const { getI18nBackEndKey } = useLocale();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (type == 1) {
      getKnowledgeSelectorType(type).then((res) => {
        setLoading(false);
        const { data } = res;

        if (data.code === 200) {
          const selector = classificationGroupBylocale(data.data[0]);

          setLangSelector(selector);
        }
      });
    } else {
      // 售后问题和教程视频使用产品分类
      // 先获取中英文分类
      // 格式与服务政策接口统一，后续统一处理
      const businessType = type == 2 ? 1 : undefined;
      Promise.all([
        getProductType('zh_cn', businessType),
        getProductType('en_us', businessType),
      ]).then(([zhRes, enRes]) => {
        const { data: zhData } = zhRes;
        const { data: enData } = enRes;
        const selector: TSelectorType = {
          type: type,
          langSelectorList: [
            {
              lang: 'zh_cn',
              classification: zhData.data.map((i) => i.productName),
            },
            {
              lang: 'en_us',
              classification: enData.data.map((i) => i.productName),
            },
          ],
          langSet: ['zh_cn', 'en_us'],
        };
        const selectorMap = classificationGroupBylocale(selector);
        setLangSelector(selectorMap);
      });
    }
  }, [type]);
  useEffect(() => {
    if (langSelector) {
      const keys = Object.keys(langSelector);
      const key = getI18nBackEndKey;

      if (keys.includes(key)) {
        setLeftList(langSelector[key]);

        const active = langSelector[key][0];
        setCurrentActiveLeftKey(active);
        setLoading(true);
        getKnowledgeList({
          pageNum: 1,
          pageSize: pageSize,
          type: type,
          classification: searchWithClassification ? active : undefined,
        })
          .then((res) => {
            const { data } = res;
            if (data.code === 200) {
              const d = groupByLocaleAndClassification(data.data.list);
              setClassificationMap(d);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [
    langSelector,
    getI18nBackEndKey,
    pageSize,
    type,
    searchWithClassification,
  ]);
  return {
    leftList,
    currentActiveLeftKey,
    langSelector,
    getI18nBackEndKey,
    classificationMap,
    setCurrentActiveLeftKey,
    loading,
    setLoading,
  };
};
