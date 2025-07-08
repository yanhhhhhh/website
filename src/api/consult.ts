import request from '@/request';
//咨询类型：SERVICE=服务支持; BUY_QUERY=产品咨询/购买查询; BUY(SHOP)=批量购买(零售商); BUY(PERSON)=批量购买(供个人使用); PERSON_PROXY=个人代理; AREA_PROXY=社区代理; COUNTRY_PROXY=国家代理;
type ConsultType =
  | 'SERVICE'
  | 'BUY_QUERY'
  | 'BUY(SHOP)'
  | 'BUY(PERSON)'
  | 'PERSON_PROXY'
  | 'AREA_PROXY'
  | 'COUNTRY_PROXY';
interface webConsultInfoDTO {
  areaCode?: string;
  areaName?: string;
  consultType?: ConsultType;
  consultText?: string;
  consultantFirstName: string;
  consultantLastName: string;
  email: string;
  phone: string;
  phoneAreaCode: string;
}
export interface CountryInfo {
  areaCode: string;
  countryCode: string;
  countryName: string;
  countryNameEnglish: string;
}
import { Result } from '@/request';
const pre = '/regionWeb/webConsultInfo';
export function saveUpdateConsult(consult: webConsultInfoDTO) {
  return request.post<{
    msg: string;
    code: number;
  }>(pre + '/saveUpdate', consult);
}
export function getCountList() {
  return request.post<Result<CountryInfo[]>>('/user/get/countryInfo', {
    countryName: '',
  });
}
