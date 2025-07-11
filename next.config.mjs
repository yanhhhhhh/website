// next.config.ts

import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 如果你需要定制 Less 的变量（如用于 Ant Design）
  // lessLoaderOptions: {
  //   lessOptions: {
  //     modifyVars: {
  //       // '@primary-color': '#1DA57A', // 可选：定制主题色
  //     },
  //     javascriptEnabled: true,
  //   },
  // },
};

const withNextIntl = createNextIntlPlugin()(nextConfig);

export default withNextIntl;
