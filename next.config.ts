// next.config.ts
import withLess from 'next-with-less';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 如果你需要定制 Less 的变量（如用于 Ant Design）
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        // '@primary-color': '#1DA57A', // 可选：定制主题色
      },
      javascriptEnabled: true,
    },
  },
};

// 使用 withLess 包裹配置
export default withLess(nextConfig);
