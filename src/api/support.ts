import request, { PageResult, Result } from '@/request';
export interface IKnowledgObject {
  type: 1 | 2 | 3; //售后知识类型（菜单目录级别） //1-售后服务 2-常见问题 3-视频教程
  groupId: string;
  langContentRespList: LangContentRespList[];
}
export interface LangContentRespList {
  id: string;
  lang: string;
  classification: string;
  question: string;
  answer: string;
  title: string;
  content: string;
  fileId: string;
  fileUrlProxy: string;
  fileType: string;
  fileName: string;
  fileDownloadPath: string;
  coverFileId: string;
  coverFileType: string;
  coverFileName: string;
  coverFileUrlProxy: string;
  coverFileDownloadPath: string;
}
interface KnowledgeParams {
  pageNum: number;
  pageSize: number;
  content?: string;
  type?: number;
  classification?: string;
  aiShow?: number;
}

export async function getKnowledgeList(params: KnowledgeParams) {
  return request.get<PageResult<IKnowledgObject>>(
    '/regionWeb/knowledge/selectListWeb',
    {
      params,
    }
  );
}

export interface TSelectorType {
  type: number;
  langSelectorList: LangSelectorList[];
  langSet: string[];
}

export interface LangSelectorList {
  lang: string;
  classification: string[];
}
export function getKnowledgeSelectorType(type: number) {
  return request.get<Result<TSelectorType[]>>(
    `/regionWeb/knowledge/getKnowledgeSelectorType`,
    {
      params: { type },
    }
  );
}
// export interface ProductType {
//   id: string;
//   productKey: string;
//   productName: string;
//   productModelList?: ProductModelList[];
// }

// interface ProductModelList {
//   id: string;
//   isDelete: string;
//   createBy: null;
//   createTime: number;
//   updateBy: null;
//   updateTime: number;
//   productId: string;
//   modelKey: string;
//   modelName: string;
// }
// export function getProductList() {
//   return request.get(`/app/product/selectList`);
// }
interface TProduct {
  id: string;
  productKey: string;
  productName: string;
}
export function getProductType(lang: string, businessType?: number) {
  return request.get<Result<TProduct[]>>(`/app/product/selectList`, {
    params: {
      businessType,
    },
    headers: {
      lang,
    },
  });
}
