import request, { authRequest, PageResult, Result } from '@/request';
const pre = '/regionWeb/TemplateInfo';
interface Template {
  isDefault: string;
  templateGroupId: number;
  templateGroupName: string;
  templateGroupCode?: any;
  templateGroupRegionMerge: string;
  templateGroupCountryMerge: string;
  templateGroupLanguageMerge: string;
}
interface TemplateParams {
  pageNum: number;
  pageSize: number;
  countryCode: string;
  languageCode: string;
}
interface TemplateGroupMap {
  isDefault: string;
  templateGroupId: string;
  templateGroupName: string;
  templateGroupCode: string;
  templateGroupRegionMerge: string;
  templateGroupCountryMerge: string;
  templateGroupLanguageMerge: string;
}
export interface TemplateGroupByCountry {
  templateGroupId: string;
  regionCode: string;
  countryCode: string;
  countryName: string;
  languageCode: string;
}
// export function getList(data: TemplateParams) {
//   return request.post<PageResult<Template>>(pre + '/selectList', data);
// }
export function getMap() {
  return request.get<Result<TemplateGroupMap[]>>(pre + '/getTemplateGroupMap');
}

export function getTemplateGroupGroupByCountry() {
  return request.get<Result<TemplateGroupByCountry[]>>(
    pre + '/getTemplateGroupGroupByCountry',
    {
      skipErrorMessage: true,
    }
  );
}
