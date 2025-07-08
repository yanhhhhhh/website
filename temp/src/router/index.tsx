import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';

import { lazy } from 'react';

import { InitRouter } from './type';
import {
  constantRouter,
  newsDetailRouter,
  regionRouter,
  templateRenderRouter,
} from './module/constant';

// 路由懒加载
const Home = lazy(() => import('@/pages/home'));
const AboutUs = lazy(() => import('@/pages/aboutUs'));
const ContactUs = lazy(() => import('@/pages/contactUs'));
const Download = lazy(() => import('@/pages/download'));
const News = lazy(() => import('@/pages/news'));
const Cooperration = lazy(() => import('@/pages/cooperation'));
const Partners = lazy(() => import('@/pages/partners'));
// 售后服务支持
const Support = lazy(() => import('@/pages/support'));

const HeroEE1kWh = lazy(() => import('@/pages/product/HeroEE1kWh'));
const HeroEE2kWh = lazy(() => import('@/pages/product/HeroEE2kWh'));
const HeroEE16kWh = lazy(
  () => import('@/pages/product/HeroEE16kWh/templateView')
);
const HeroEE8kWh = lazy(
  () => import('@/pages/product/HeroEE8kWh/templateView')
);

const SolarPanelPage = lazy(() => import('@/pages/solarPanel'));
const PartsPage = lazy(() => import('@/pages/parts'));
const AiChat = lazy(() => import('@/pages/ai'));
// const ApplyScene = lazy(
//   () => import('@/pages/product/intro/components/applyScene/view')
// );
// const HeroScene = lazy(
//   () => import('@/pages/product/intro/components/hero-scene/view')
// );

export const homeRouter: InitRouter = {
  name: 'navigator.home',
  path: '',
  handle: {
    key: 'home',
  },
  element: <Home />,
};
export const productRouter: InitRouter = {
  name: 'navigator.production',
  path: 'product_intro',
  // element: <ProductIntro />,
  children: [
    {
      name: 'navigator.1kWh',
      path: '1kWh',
      handle: {
        key: 'HeroEE1',
      },
      element: <HeroEE1kWh />,
    },
    {
      name: 'navigator.1kWh',
      path: '2kWh',
      handle: {
        key: 'HeroEE2',
      },
      element: <HeroEE2kWh />,
    },
    {
      name: 'navigator.8kWh',
      path: '8kWh',
      handle: {
        key: 'HeroEE8',
      },
      element: <HeroEE8kWh />,
    },
    {
      name: 'navigator.16kWh',
      path: '16kWh',
      handle: {
        key: 'HeroEE16',
      },
      element: <HeroEE16kWh />,
    },
  ],
};
export const solarPanelRouter: InitRouter = {
  name: 'navigator.solarPanel',
  path: 'solarPanel',
  handle: {
    key: 'solarPanel',
  },
  element: <SolarPanelPage />,
};
export const partsRouter: InitRouter = {
  name: 'navigator.parts',
  path: 'parts',
  handle: {
    key: 'parts',
  },
  element: <PartsPage />,
};

export const companyProfileRouter: InitRouter = {
  name: 'navigator.companyProfile',
  path: 'companyProfile',
  handle: {
    key: 'companyProfile',
  },
  element: <AboutUs />,
};
export const cooperationRouter: InitRouter = {
  name: 'navigator.cooperation',
  path: 'cooperation',
  handle: {
    key: 'cooperation',
  },
  element: <Cooperration />,
};
export const partnersRouter: InitRouter = {
  name: 'navigator.partners',
  path: 'partners',
  handle: {
    key: 'partners',
  },
  element: <Partners />,
};
export const newsRouter: InitRouter = {
  name: 'navigator.press',

  path: 'news',
  handle: {
    key: 'news',
  },
  element: <News />,
};

export const contactUsRouter: InitRouter = {
  name: 'navigator.contactUs',
  path: 'contactUs',
  handle: {
    key: 'contactUs',
  },
  element: <ContactUs />,
};
export const downloadRouter: InitRouter = {
  name: 'navigator.download',
  path: 'download/:type?/:productKey?',
  handle: {
    key: 'download',
  },
  element: <Download />,
};

export const aboutUsRouter: InitRouter = {
  path: 'aboutUs',
  handle: {
    key: 'aboutUs',
  },
  name: 'navigator.aboutUs',
  children: [
    companyProfileRouter,
    contactUsRouter,
    newsRouter,
    cooperationRouter,
  ],
};

export const supportRouter: InitRouter = {
  name: 'navigator.support',
  path: 'support/:type?/:productKey?',

  handle: {
    key: 'support',
  },
  element: <Support />,
};

export const routers = [
  homeRouter,
  productRouter,
  solarPanelRouter,
  partsRouter,
  aboutUsRouter,
];
export const kenyaRouters = [
  {
    ...homeRouter,
    name: 'navigator.HeroEE1',
    handle: {
      key: 'HeroEE1',
    },
  },
  {
    name: 'navigator.HeroEE2',
    path: 'product_intro/2kWh',
    handle: {
      key: 'HeroEE2',
    },
    element: <HeroEE2kWh />,
  },

  {
    name: 'navigator.HeroEE8',
    path: 'product_intro/8kWh',
    handle: {
      key: 'HeroEE8',
    },
    element: <HeroEE8kWh />,
  },
  {
    name: 'navigator.HeroEE16',
    path: 'product_intro/16kWh',
    handle: {
      key: 'HeroEE16',
    },
    element: <HeroEE16kWh />,
  },
];
const router = createBrowserRouter(
  [
    {
      path: '/:locale?',
      element: <App />,
      children: [
        // 根据配置生成路由
        ...routers,
        downloadRouter,
        supportRouter,

        // 固定路由
        regionRouter,
        newsDetailRouter,
        templateRenderRouter,
        {
          path: 'ai/:productKey?',
          element: <AiChat />,
          handle: {
            key: 'ai',
          },
        },
        // subscriptionRouter,
        // exhibitionRouter,
        // applySceneRouter,
        // heroSceneRouter,
      ],
    },
    // 固定路由
    ...constantRouter,
  ],
  {
    basename: import.meta.env.VITE_ROUTER_BASE,
  }
);

export default router;
