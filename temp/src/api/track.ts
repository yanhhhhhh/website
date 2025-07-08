import request, { Result } from '@/request';

interface ITrack {
  eventSource: IEventSource; //事件源
  eventCode: IEventCode; //埋点事件code
  eventTriggerType: IEventTriggerType;
  eventTime: number; // 时间戳
  userId?: string; //用户id
  router: string; //埋点事件触发时前端路由
  requestUri?: string; //埋点事件触发时后端url
  device?: string; //登陆设备（PC，手机，平板）
  deviceUniqueId?: string; //设备唯一标识符
  eventContent: string; //事件内容json 字符串  "{ \"operation\": \"八度电访问\",\"country\": \"CN\"}" , "operation":"当前埋点操作位置名称", "country": "当前操作的国家",
  ip?: string; //ip地址
  geoLocation?: string; //位置信息
  operatingSystem?: string; //操作系统
  userAgent?: string; //浏览器信息
  network?: string; //网络信息
}
type IEventSource = 'WEB_SITE';
type IEventCode = 'WEBSITE_ACCESS' | 'WEBSITE_DOWNLOAD' | 'WEBSITE_LINK';
type IEventTriggerType = 'click' | 'view' | 'purchase';
export interface IeventContent {
  operation: string;
  country: string;
  operationItem?: string;
  operationItemLink?: string;
  [key: string]: any;
}

// 埋点接口
export function trackGather(data: ITrack) {
  return request.post<Result<boolean>>('/event/tracking/gather', data);
}
