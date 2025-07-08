import request, { PageResult, Result } from '@/request';

export interface Manual {
  manualId: number;
  templateGroupId: number;
  templateGroupName: string;
  manualType: string;
  manualKey: string;
  manualName: string;
  manualVersion: string;
  isPublish: string;
  publishTime: number;
  checkStatus: string;
  manualFileId: string;
  manualFileType: string;
  templateGroupRegionMerge: string;
  templateGroupCountryMerge: string;
  templateGroupLanguageMerge: string;
  publishBy: string;
  manualUrl: string;
}

export interface TManual extends Manual {
  manualFileUrl: string;
  manualFileUrlProxy: string;
}
interface ManualParams extends Partial<Manual> {
  pageNum: number;
  pageSize: number;
  templateGroupIds: string[];
}
export function getManualList(data?: ManualParams) {
  return request.post<PageResult<Manual>>(
    '/regionWeb/manuals/selectList',
    data
  );
}
export interface TManualType {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  pageNum: number;
  pageSize: number;
  manualSource: number;
  manualKey: string;
  manualType: string;
  disabled: boolean;
}
export const getManualsType = () =>
  request.post<Result<TManualType[]>>('/regionWeb/webManualsType/selectList');
