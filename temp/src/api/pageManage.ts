import request, { PageResult, Result, authRequest } from '@/request';

const pre = '/regionWeb/webPageInfo';
export interface PageParams {
  id?: string;
  templateGroupIds?: string;
  pageNum: number;
  pageSize: number;
  pageName?: string;
  pageVersion?: string;
  isPublish?: string; //是否发布Y=是，N=否
  publishTime?: number;
  checkStatus?: string; //审核状态Y=是，N=否
  checkTime?: number;
}

export interface PageObject {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  pageName: string;
  pageVersion: string;
  isPublish: string;
  publishTime: number;
  checkStatus: string;
  checkTime: number;
  templateGroupName: string;
  templateGroupIds: string[];
  headerLabelTemplateId: string;
  tailLabelTemplateId: string;
}
export interface PageBodyData {
  pageName: string;
  pageVersion: string;
  templateGroupIds: string[];
  isPublish?: string;
  publishTime?: number;
}
export function getList(params?: PageParams) {
  return request.get<PageResult<PageObject>>(pre + '/selectList', {
    params,
  });
}

export function add(data: Partial<PageBodyData>) {
  return authRequest.post<Result<PageObject>>(pre + '/save', data);
}
export function update(id: string, data: Partial<PageBodyData>) {
  return authRequest.post<Result<boolean>>(pre + '/update', {
    id,
    ...data,
  });
}
export function del(id: string) {
  return authRequest.post<Result<boolean>>(`${pre}/remove`, {
    id,
  });
}
export function copyPage(currentPageId: string, copyPageId: string) {
  return authRequest.post<Result<boolean>>(`${pre}/copyPage`, {
    id: currentPageId,
    copyPageId,
  });
}
export interface LabelTreeDataNode {
  pageId: string;
  pageName: string;
  childLabelDTOList: ChildLabelDTOList[];
}

export interface ChildLabelDTOList {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  pageId: string;
  labelSource: number;
  parentId: string;
  labelType: null;
  labelCode: string;
  labelName: string;
  sort: number;
  childLabelDTOList: ChildLabelDTOList[];
  contentJson: null | string;
}
export function getLabelTreeWithPage() {
  return request.post<Result<LabelTreeDataNode[]>>(
    `${pre}/getLabelTreeWithPage`
  );
}
export type CopyLabelTree = {
  id: string;
  child?: CopyLabelTree[];
};

export function copyPageCustom(
  currentPageId: string,
  // copyLabelTree: CopyLabelTree
  labelIdList: string[]
) {
  return authRequest.post<Result<boolean>>(`${pre}/copyPage/customized`, {
    id: currentPageId,
    labelIdList,
  });
}
