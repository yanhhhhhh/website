import { lazy } from 'react';
/**
 *  加载模块
 * @param module
 * @returns
 */
export async function loadModule(module: Promise<any>) {
  try {
    const def = (await module).default;

    return def;
  } catch (error) {
    console.error('Error loading module:', error);
  }
}
export const heroEEComponents = {
  HeroEEImage: {
    render: lazy(() => import('./heroEEImage')),
    setter: lazy(() => import('./heroEEImage/setter')),
    componentType: 'HeroEEImage',
    defaultSetter: import('./heroEEImage/defaultSetter'),
    key: 'HeroEEImage',
    name: '图片',
  },
  HeroEEVideo: {
    render: lazy(() => import('./heroEEVideo')),
    setter: lazy(() => import('./heroEEVideo/setter')),

    componentType: 'HeroEEVideo',
    defaultSetter: import('./heroEEVideo/defaultSetter'),
    key: 'HeroEEVideo',
    name: '视频',
  },
  HeroEECarousel: {
    render: lazy(() => import('./heroEECarousel')),
    setter: lazy(() => import('./heroEECarousel/setter')),
    defaultSetter: import('./heroEECarousel/defaultSetter'),
    componentType: 'HeroEECarousel',
    key: 'HeroEECarousel',
    name: '轮播',
  },
};

export type ComponentKey = keyof typeof heroEEComponents;
