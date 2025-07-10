'use client';
import { InitRouter } from '@/router/type';
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from 'next/navigation';

import { useCallback } from 'react';

export const useHeroNavigate = () => {
  const { locale } = useParams<{ locale: string }>();

  const search = useSearchParams();
  const pathName = usePathname();

  const navigate = useRouter();

  const getPath = useCallback(
    (path?: string) => {
      const searchStr = search ? `?${search.toString()}` : '';
      const hash = window.location.hash;
      //  fix:hash 里面有参数的情况
      const hashQueryString = hash.includes('?') ? hash.split('?')[1] : '';
      const paramsStr = new URLSearchParams(hashQueryString).toString();
      const searchString = hashQueryString ? `?${paramsStr}` : searchStr;
      if (!locale) {
        return path ?? `/${searchString}`;
      }
      if (path?.startsWith('/')) {
        return `/${locale}${path}${searchString}`;
      }
      return `/${locale}/${path}${searchString}`;
    },
    [locale, search]
  );
  // 更新路由的 path , 递归更新子路由的 path
  const updatePathsToRoot = useCallback(
    (route: InitRouter, parentPath: string = '') => {
      // 更新当前路由的 path
      const childLike = route.path?.startsWith('/')
        ? route.path
        : `/${route.path}`;
      const updatedRoute = {
        ...route,
        name: route.name ?? '',
        to: getPath(`${parentPath}${childLike}`),
      };

      // 如果有子路由，也递归地更新它们的 path
      if (updatedRoute.children) {
        updatedRoute.children = updatedRoute.children.map((child) => {
          return updatePathsToRoot(child, updatedRoute.path ?? '');
        });
      }

      return updatedRoute;
    },
    [getPath]
  );
  const navigateTo = useCallback(
    (path?: string) => {
      const newPath = getPath(path);
      // navigate(newPath, {
      //   state: { from: location.pathname, location, search: location.search },
      // });
    },
    [getPath, navigate]
  );
  return {
    navigateTo,
    getPath,
    updatePathsToRoot,
    navigate,
  };
};
