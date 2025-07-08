import {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom';
// 扩展基本路由对象以包括 name 属性
export type ExtendedRouteObjectBase = RouteObject & {
  name?: string;
  to?: string;
};
// 扩展非索引路由对象，特别是为了修改 children 的类型
export interface ExtendedNonIndexRouteObject
  extends Omit<NonIndexRouteObject, 'children'> {
  children?: InitRouter[]; // 使用扩展后的路由对象类型
  name?: string; // 保证 name 属性在这里也可用
  to?: string;
}
// 由于 ExtendedNonIndexRouteObject 引用了 ExtendedRouteObject，我们需要定义 ExtendedRouteObject 以完成这个循环引用
export type InitRouter =
  | ExtendedNonIndexRouteObject
  | (IndexRouteObject & { name?: string; to?: string });
