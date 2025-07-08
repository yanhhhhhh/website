import { lazy } from 'react';
import { InitRouter } from '../type';
// lazy 会导致iframe无法传递消息
import BottomMenuManage from '@/pages/menuManage/bottom';
import PageManage from '@/pages/pageManage';
import TopMenuManage from '@/pages/menuManage/top';
//lazy 会导致iframe无法传递消息
const ExternalHtmlPage = lazy(() => import('@/pages/externalHtmlPage'));
const Region = lazy(() => import('@/pages/region'));
const TemplateRenderPage = lazy(() => import('@/pages/templateRenderPage'));
const NetworkError = lazy(() => import('@/pages/networkError'));
const NewsDetail = lazy(() => import('@/pages/news/components/newsDetail'));
const NoMatch = lazy(() => import('@/pages/noMatch'));
const EditorPage = lazy(() => import('@/pages/editor/editorPage'));

const NetworkErrorRouter: InitRouter = {
  path: 'network_error',

  element: <NetworkError />,
};
export const templateRenderRouter: InitRouter = {
  path: 'templateRender/:routerCode/:id?',
  element: <TemplateRenderPage />,
};
export const regionRouter: InitRouter = {
  path: 'region',
  handle: {
    key: 'region',
  },
  element: <Region />,
};
export const newsDetailRouter: InitRouter = {
  name: 'navigator.newsDetail',
  path: 'detail/:id',
  handle: {
    key: 'newsDetail',
  },
  element: <NewsDetail />,
};
export const constantRouter = [
  NetworkErrorRouter,
  {
    path: 'editor/:id?',
    element: <EditorPage />,
    handle: {
      key: 'editor',
    },
  },
  {
    path: 'pageManage',
    element: <PageManage />,
    handle: {
      key: 'pageManage',
    },
  },
  {
    path: 'topMenuManage',
    element: <TopMenuManage />,
    handle: {
      key: 'topMenuManage',
    },
  },
  {
    path: 'bottomMenuManage',
    element: <BottomMenuManage />,
    handle: {
      key: 'bottomMenuManage',
    },
  },
  {
    path: 'externalHtmlPage/:id?',
    element: <ExternalHtmlPage />,
    handle: {
      key: 'externalHtmlPage',
    },
  },

  {
    path: '*',
    handle: {
      key: 'noMatch',
    },
    element: <NoMatch />,
  },
];
