import { stringify } from 'qs';
import request, { PageResult, Result } from '@/request';

import { LanguagesMap } from '@/constants/languagesMap';
import { getDicts } from './dict';

type TExampleTitle = 'DEFAULT' | 'NEWS' | 'DYNAMIC'; // 案例类型：DEFAULT=默认模板1; NEWS=公司新闻;DYNAMIC=最新动态
type TPublishStatus = 'Y' | 'N'; // 发布状态Y=是，N=否
type TCheckStatus = 'Y' | 'N';
type TCoverType = 'IMG' | 'VIDEO'; // 封面类型:IMG图片,VIDEO视频
type TLanguage = keyof typeof LanguagesMap;

interface CaseListFilters {
  id?: string;
  areaCode?: string; // 国家编码
  exampleTitle?: string; // 案例标题
  exampleType?: TExampleTitle; // 案例类型
  exampleText?: string; // 案例正文
  publishStatus?: TPublishStatus; // 发布状态
  coverType?: TCoverType;
  pageNum?: number;
  pageSize?: number;
  language?: TLanguage;
  templateGroupIds: string[];
}

export interface ICase {
  id: string;
  createBy: string;
  createTime: string;
  updateBy?: string;
  updateTime?: string;
  areaCode: string;
  exampleTitle: string;
  exampleType: string;
  exampleText: string;
  description: string; // 编辑摘要
  showTimeStart: string;
  showTimeEnd: string;
  publishStatus: TPublishStatus;
  checkStatus: TCheckStatus;
  coverType: TCoverType;
  coverUrl: string;

  mobileCoverUrl: string;
  coverId: string;
  mobileCoverId: string;
  language?: TLanguage;
  exampleTag?: string;
}

const caseUrlPre = '/regionWeb/webExampleInfo';
const ExampleTypeDictKey = 'web_example_type';
// 获取案例列表
export function getCaseList(filters: CaseListFilters) {
  const params = stringify(filters);
  return request.get<PageResult<ICase>>(`${caseUrlPre}/selectList?${params}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 获取案例详情
export function getCaseDetail(id: string) {
  return request.get<Result<ICase>>(`${caseUrlPre}/detail/${id}`);
}
export function getExampleTypeDict() {
  return getDicts(ExampleTypeDictKey);
}
