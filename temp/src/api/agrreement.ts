import request, { PageResult } from '@/request';

const pre = '/regionWeb/webTermsInfo';
export interface AgreementObject {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  countryId: number;
  language: string;
  fileType: string;
  termsText: 'WEB' | 'APP';
  termsType: string;
}
export interface AgreementParams {
  pageNum: number;
  pageSize: number;
  termsType?: 'WEB' | 'APP';
  language?: 1 | 2; //英文1，中文2
}
export function getList(params: AgreementParams) {
  return request.get<PageResult<AgreementObject>>(pre + '/selectList', {
    params,
  });
}
export function getDetail(id: number) {
  return request.get<AgreementObject>(`${pre}/getById/${id}`);
}
export function getDetailHtml(id: string) {
  return `${import.meta.env.VITE_APP_BASE_API}${pre}/getTextById/${id}`;
  // return `http://172.24.73.23:9200${pre}/getTextById/${id}`;
}
export function getExternalHtmlById(id: string) {
  return fetch(`${import.meta.env.VITE_APP_BASE_API}${pre}/getTextById/${id}`)
    .then((response) => response.text())
    .then((data) => data);
}
export function getExternalHtmlByUrl(url: string) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => data);
}
