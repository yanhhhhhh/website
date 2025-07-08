// import {
//   IndexRouteObject,
//   NonIndexRouteObject,
//   RouteObject,
//   createBrowserRouter,
// } from 'react-router-dom';

// import { lazy } from 'react';
// import { Home, NetworkError, SolarPanelPage } from '@/pages';
// import ExternalHtmlPage from '@/pages/externalHtmlPage';
// import App from '@/App';

// import {
//   ProductIntro,
//   ServicesSubscriptions,
//   Exhibition,
// } from '@/pages/product';

// import Region from '@/pages/region';

// import PartsPage from '@/pages/parts';
// import { HeroEE1kWh } from '@/pages/product/HeroEE1kWh';
// import { HeroEE2kWh } from '@/pages/product/HeroEE2kWh';
// import { Editor } from '@/pages/editor';
// import { PageManage } from '@/pages/pageManage';
// import { EditorPage } from '@/pages/editor/editorPage';
// // 扩展基本路由对象以包括 name 属性
// export type ExtendedRouteObjectBase = RouteObject & {
//   name?: string;
//   to?: string;
// };
// // 扩展非索引路由对象，特别是为了修改 children 的类型
// export interface ExtendedNonIndexRouteObject
//   extends Omit<NonIndexRouteObject, 'children'> {
//   children?: InitRouter[]; // 使用扩展后的路由对象类型
//   name?: string; // 保证 name 属性在这里也可用
//   to?: string;
// }
// // 由于 ExtendedNonIndexRouteObject 引用了 ExtendedRouteObject，我们需要定义 ExtendedRouteObject 以完成这个循环引用
// export type InitRouter =
//   | ExtendedNonIndexRouteObject
//   | (IndexRouteObject & { name?: string; to?: string; key?: string });

// // 路由懒加载
// const AboutUs = lazy(() => import('@/pages/aboutUs'));
// const ContactUs = lazy(() => import('@/pages/contactUs'));
// const Download = lazy(() => import('@/pages/download'));
// const News = lazy(() => import('@/pages/news'));
// const NewsDetail = lazy(() => import('@/pages/news/components/newsDetail'));
// const Partners = lazy(() => import('@/pages/partners'));
// const NoMatch = lazy(() => import('@/pages/noMatch'));

// const ApplyScene = lazy(
//   () => import('@/pages/product/intro/components/applyScene/view')
// );
// const HeroScene = lazy(
//   () => import('@/pages/product/intro/components/hero-scene/view')
// );

// export const homeRouter: InitRouter = {
//   name: 'navigator.home',
//   path: '',

//   element: <Home />,
// };
// export const productRouter: InitRouter = {
//   name: 'navigator.production',
//   path: 'product_intro',
//   // element: <ProductIntro />,
//   children: [
//     {
//       name: 'navigator.1kWh',
//       path: '1kWh',
//       element: <HeroEE1kWh />,
//     },
//     {
//       name: 'navigator.1kWh',
//       path: '2kWh',
//       element: <HeroEE2kWh />,
//     },
//   ],
// };
// export const solarPanelRouter: InitRouter = {
//   name: 'navigator.solarPanel',
//   path: 'solarPanel',
//   element: <SolarPanelPage />,
// };
// export const partsRouter: InitRouter = {
//   name: 'navigator.parts',
//   path: 'parts',
//   element: <PartsPage />,
// };

// export const companyProfileRouter: InitRouter = {
//   name: 'navigator.companyProfile',
//   path: 'companyProfile',
//   element: <AboutUs />,
// };
// export const partnersRouter: InitRouter = {
//   name: 'navigator.partners',
//   path: 'partners',
//   element: <Partners />,
// };
// export const newsRouter: InitRouter = {
//   name: 'navigator.press',
//   path: 'news',

//   element: <News />,
// };

// export const newsDetailRouter: InitRouter = {
//   name: 'navigator.newsDetail',
//   path: 'detail/:id',

//   element: <NewsDetail />,
// };
// export const contactUsRouter: InitRouter = {
//   name: 'navigator.contactUs',
//   path: 'contactUs',
//   element: <ContactUs />,
// };
// export const downloadRouter: InitRouter = {
//   name: 'navigator.download',
//   path: 'download',
//   element: <Download />,
// };
// export const subscriptionRouter: InitRouter = {
//   name: 'navigator.service',
//   path: 'services_subscriptions',
//   element: <ServicesSubscriptions />,
// };
// export const exhibitionRouter: InitRouter = {
//   name: 'navigator.exhibition',
//   path: 'exhibition',
//   element: <Exhibition />,
// };
// export const applySceneRouter: InitRouter = {
//   name: 'navigator.apply',
//   path: 'apply',
//   element: <ApplyScene />,
// };
// export const heroSceneRouter: InitRouter = {
//   name: 'navigator.heroScene',
//   path: 'hero_scene',
//   element: <HeroScene />,
// };
// export const regionRouter: InitRouter = {
//   path: 'region',
//   element: <Region />,
// };
// const NetworkErrorRouter: InitRouter = {
//   path: 'network_error',
//   element: <NetworkError />,
// };

// export const aboutUsRouter: InitRouter = {
//   path: 'aboutUs',
//   name: 'navigator.aboutUs',
//   children: [companyProfileRouter, contactUsRouter, newsRouter],
// };

// export const routers = [
//   homeRouter,
//   productRouter,
//   solarPanelRouter,
//   partsRouter,
//   aboutUsRouter,
// ];

// const router = createBrowserRouter([
//   {
//     path: '/:locale?',
//     element: <App />,
//     children: [
//       ...routers,
//       downloadRouter,
//       newsDetailRouter,
//       regionRouter,
//       subscriptionRouter,
//       exhibitionRouter,
//       applySceneRouter,
//       heroSceneRouter,
//     ],
//   },
//   NetworkErrorRouter,

//   {
//     path: 'editor/:id?',
//     element: <EditorPage />,
//   },
//   {
//     path: 'pageManage',
//     element: <PageManage />,
//   },
//   {
//     path: 'externalHtmlPage/:id?',
//     element: <ExternalHtmlPage />,
//   },
//   // {
//   //   path: '/api/*', // Exclude paths starting with '/api'
//   //   element: null, // or render nothing, assuming you want to bypass these routes
//   // },
//   {
//     path: '*',

//     element: <NoMatch />,
//   },
// ]);

// export default router;
