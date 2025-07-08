import { PageResult, Result, authRequest } from '@/request';
import { TLabelType } from './label';
const pre = '/regionWeb/webLabelTemplate';
type TLabelSource = 1 | 3;
export type TLabelLevel = 1 | 2 | 3;
export interface PageParams {
  labelSource?: 1 | 3; //标签源，1-官网-顶部导航 3-官网-底部导航
  labelTemplateName?: string;
  linkLabelTemplateId?: string; //底部关联顶部

  pageNum: number;
  pageSize: number;
}
export interface TMenuListItem {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  labelTemplateName: string;
  labelSource: TLabelSource;
  childLabelTemplate: null;
  linkLabelTemplateId: string;
  linkLabelTemplateNameList: string[];
}
export interface TAddMenuListItem {
  labelTemplateName: string;
  labelSource: number;
}
export function getList(params: PageParams) {
  return authRequest.post<PageResult<TMenuListItem>>(
    pre + '/selectList',
    params
  );
}
export function add(data: TAddMenuListItem) {
  return authRequest.post<Result<null>>(pre + '/save', data);
}

export function update(id: string, data: Partial<TMenuListItem>) {
  return authRequest.post<Result<null>>(pre + '/update', {
    id,
    ...data,
  });
}
export function del(idList: string[]) {
  return authRequest.post<Result<boolean>>(`${pre}/remove`, {
    idList,
  });
}
export interface TMenuObject {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  labelTemplateId: string;
  labelSource: TLabelSource;
  parentId: string;
  labelCode: string;
  labelName: string;
  labelLevel: TLabelLevel; //1-2
  router: string; //路由地址
  routerCode: string; //路由code
  component?: string; //组件文件地址
  imgUrl?: string; //图片地址
  isLink: boolean; //是否外链,0-否 1-是
  linkUrl?: string; //外链地址
  disabled: boolean; // 是否展示,0-否 1-是
  isCustom: boolean; //是否自定义,0-否 1-是
  labelType: TLabelType; //标签类型
  sort: number; //标签排序
  child?: TMenuObject[];
  i18nLabelName: Record<string, string>; //国际化
  param?: string; //存放json 字符串
}
export interface TAddMenuForm {
  labelName: string;
  router: string;
  routerCode: string;
  component?: string;
  imgUrl?: string; //图片地址
  isLink: boolean;
  linkUrl?: string; //外链地址
  disabled: boolean;
  isCustom: boolean;
  i18nLabelName: Record<string, string>; //国际化
  sort: number;
  param?: string; //存放json 字符串
  labelType: TLabelType;
  child?: TMenuObject[];
}
export interface TAddMenuObject extends TAddMenuForm {
  labelTemplateId: string;
  labelSource: TLabelSource;
  parentId: string; //parent_id 顶层传0
  labelLevel: TLabelLevel;
}

const detailPre = '/regionWeb/webLabelTemplateDetail';
export function getMenuDetail(
  labelTemplateId: string,
  labelSource: TLabelSource
) {
  return authRequest.post<Result<TMenuObject[]>>(detailPre + '/selectList', {
    labelTemplateId,
    labelSource,
  });
}
export function addMenuDetail(data: TAddMenuObject) {
  return authRequest.post<Result<null>>(detailPre + '/save', data);
}
export function updateMenuDetail(data: TAddMenuObject[]) {
  return authRequest.post<Result<null>>(detailPre + '/update', {
    templateDetailList: data,
  });
}
export function delMenuDetail(idList: string[]) {
  return authRequest.post<Result<boolean>>(detailPre + '/remove', {
    idList,
  });
}
export function disabledMenuDetail(id: string, disabled: boolean) {
  return authRequest.post<Result<boolean>>(detailPre + '/disabled', {
    id,
    disabled,
  });
}
