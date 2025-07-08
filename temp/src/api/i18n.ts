import { Result, authRequest, request } from '@/request';

const pre = '/hero-i18n/internationalization';
export interface I18nObject {
  code: string;
  zh_tw: string;
  en_us: string;
  module: string;
  id: string;
  zh_cn: string;
  serviceName: string;
  translationStatus: string;
}
interface I18nParams {
  serviceName?: string;
  module?: string;
  code?: string;
  languageCode?: string;
  languageValue?: string;
  translationStatus?: string;
}
export interface TLanguageObject {
  languageCode: string;
  languageContent: string;
}
export interface I18nData {
  id: string;
  serviceName: string;
  module: string;
  code: string;
  languageLists: TLanguageObject[];
}

interface InternationalizationDict {
  serviceNames: string[]; // 服务名
  i18nLanguagesFormatEnums: string[];
  languages: Language[]; // 语言
}

export interface Language {
  languageCode: string;
  languageName: string;
}

// 获取国际化列表(不分页)
export function getI18nList(params?: I18nParams) {
  return request.get<Result<I18nObject[]>>(pre + '/selectListNoPage', {
    params,
  });
}
/**
 * 新增|修改国际化
 * @param data
 * @returns
 */

export function i18nSaveUpdate(data: Partial<I18nData>) {
  return authRequest.post<Result<string>>(pre + '/saveUpdate', data);
}
// 获取国际化字典
export function getInternationalizationDict() {
  return authRequest.get<Result<InternationalizationDict>>(
    pre + '/getInternationalizationDict'
  );
}
export const getI18nObjectByCode = async (code: string) => {
  const { data } = await getI18nList({
    code,
    serviceName: 'page-manage',
  });

  return data?.data?.[0] ?? {};
};

export const delI18nObject = (ids: string[]) => {
  return authRequest.delete<Result<boolean>>(pre + `/${ids.join(',')}`);
};
