import { Result, request } from '@/request';
export type TLabelType =
  | 'menu'
  | 'configPage'
  | 'customPage'
  | 'configCard'
  | 'customCard'
  | 'bottomPageNav';
// 获取标签列表
export interface LabelObject {
  id: string; // ！！！！！！！！修改删除时用这个id
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  pageId: string;
  labelSource: number;
  parentId: string;
  labelType: TLabelType;
  labelCode: string;
  labelName: string;
  labelTemplateId: string;
  labelTemplateDetailId: string; // ！！！！！！ 父子层级关联标签id
  labelTemplateDetailParentId: string; // ！！！！！！父级标签模板id
  labelLevel: number;
  router: string;
  routerCode: string;
  component?: string;
  imgUrl?: string;
  isLink: boolean;
  linkUrl?: string;
  disabled: boolean;
  isCustom: boolean;
  i18nLabelNameJson: Record<string, string>;
  sort: number;
  param?: string;
  childLabelDTOList: ChildLabelDTOList[];
  // labelContentDTOList: null;
}

export interface ChildLabelDTOList extends LabelObject {
  contentJson?: string;
}

interface LabelParams {
  pageId: string;
  labelSource?: number; // 标签来源 1-系统 2-自定义
  labelCode?: string; // 标签编码
}
interface LabelBodyData {
  id: string;
  labelCode?: string;
  labelName?: string;
  contentJson?: string;
  labelSource?: 1 | 3;
}

const pre = '/regionWeb/webLabel';
// 获取标签列表
export function getLabelList(params?: LabelParams) {
  return request.get<Result<LabelObject[]>>(pre + '/selectList', {
    params,
  });
}
// 暂时不需要使用
// export function saveLabel(data: LabelBodyData) {
//   return request.post<Result<string>>(pre + '/save', {
//     data,
//   });
// }
export function updateLabel(data: LabelBodyData) {
  return request.post<Result<string>>(pre + '/update', {
    data,
  });
}
// export function delLabel(id: string) {
//   return request.post<Result<string>>(pre + '/delete', {
//     data: { id },
//   });
// }
