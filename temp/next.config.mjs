/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: '/intro', // Set the base path for the app
  assetPrefix: '/intro', // Set the asset prefix
  // trailingSlash: true, // Add trailing slash to routes
  // images: {
  //   unoptimized: true, // Disable image optimization for static export
  // },
  // eslint: {
  //   ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  // },
  // webpack: (config) => {
  //   // Add support for LESS files
  //   config.module.rules.push({
  //     test: /\.less$/,
  //     use: [
  //       'style-loader',
  //       'css-loader',
  //       {
  //         loader: 'less-loader',
  //         options: {
  //           lessOptions: {
  //             javascriptEnabled: true,
  //           },
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};

export default nextConfig;
