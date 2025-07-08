import { Result, authRequest, request } from '@/request';
import { ComponentKey } from '@/pages/editor/packages/heroEEComponents/index';
import { ChildLabelDTOList } from '@/api/label';

export interface ContentJson {
  labelId: string; // 标签id
  componentType: ComponentKey; // 组件类型
  id: string; // 组件key 用于唯一标识 componentType/uuid
  componentSetterType: string; // 组件设置类型
  // 组件属性
  componentProps?: {
    common?: {
      [key: string]: any; // 组件属性
    };
    mobile?: {
      [key: string]: any;
    };
    pc?: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  style?: {
    commo?: {
      [key: string]: any;
    };
    mobile?: {
      [key: string]: any;
    };
    pc?: {
      [key: string]: any;
    };
  };
  // i18n 配置
  i18n?: {
    serviceName: string; // 官网默认为服务名称page-manage
    module: string; // 页面labelName_父级labelid(唯一标识) 方便查询module下的所有i18n
    code: string; // 'i18n code 规则为p1_uuid'
  };
  // 组件事件
  componentEvents?: {
    [key: string]: any;
  };
  // 其他配置
  className?: string; // 自定义 CSS 类
  children?: ContentJson[]; // 子组件
}
export interface TDefaultSetter
  extends Omit<ContentJson, 'componentKey' | 'labelId' | 'id'> {}

export interface LabelContentObject {
  id: string;
  isDelete: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  labelId: string;
  platform: string;
  contentType: number;
  contentJson?: string;
}
const pre = '/regionWeb/webLabelContent';
export interface LabelContentParams {
  labelId: string;
}
export interface LabelContentBodyData {
  labelId: string;
  contentType?: number; //内容类型（1.图片 2.视频 3.轮播 4.文字）
  contentJson: undefined | string;
}
export interface TLabelContentObject
  extends Omit<ChildLabelDTOList, 'contentJson'> {
  contentJsonParse: ContentJson;
}
export function getLabelContentList(params: LabelContentParams) {
  return request.get<Result<LabelContentObject[]>>(pre + '/selectList', {
    params,
  });
}
export function saveLabelContent(data: LabelContentBodyData) {
  return authRequest.post<Result<string>>(pre + '/save', data);
}
export async function updateLabelContent(data: LabelContentBodyData) {
  const { labelId, ...rest } = data;
  const contentList = await getLabelContentList({ labelId }).then((res) => {
    return res.data.data;
  });

  const content = contentList.find((item) => item.labelId === labelId);
  if (!content) {
    return saveLabelContent(data);
  } else {
    return authRequest.post<Result<string>>(pre + '/saveUpdate', {
      ...rest,
      id: content.id,
    });
  }
}
