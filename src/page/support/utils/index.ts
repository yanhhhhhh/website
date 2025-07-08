import {
  IKnowledgObject,
  LangContentRespList,
  TSelectorType,
} from '@/api/support';

export function classificationGroupBylocale(data: TSelectorType) {
  const result: Record<string, string[]> = {};
  data.langSelectorList.forEach((item) => {
    result[item.lang] = item.classification;
  });
  return result;
}
// 按照语言分组，在按照分类分组
export function groupByLocaleAndClassification(data: IKnowledgObject[]) {
  const result: Record<string, Record<string, LangContentRespList[]>> = {};
  data.forEach((item) => {
    item.langContentRespList.forEach((langItem) => {
      if (!result[langItem.lang]) {
        result[langItem.lang] = {};
      }
      if (!result[langItem.lang][langItem.classification]) {
        result[langItem.lang][langItem.classification] = [];
      }
      result[langItem.lang][langItem.classification].push(langItem);
    });
  });
  return result;
}
