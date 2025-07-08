import { Spin } from 'antd';
import { PropsWithChildren } from 'react';
import LazyLoad from 'react-lazyload';
import './index.less';
export const LazyLoadWrap = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <LazyLoad
      once
      placeholder={
        <div className="banner-placeholder">
          <Spin />
        </div>
      }
    >
      {children}
    </LazyLoad>
  );
};
export default LazyLoadWrap;
