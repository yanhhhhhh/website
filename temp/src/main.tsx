import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import { Providers } from './providers';

import '@/utils/language/i18nConfig.ts';

import '@/assets/styles/global.less';
import './index.less';
// import VConsole from 'vconsole';

// const vConsole = new VConsole();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
