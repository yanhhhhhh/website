import { memo, useMemo } from 'react';
import './index.less';
import { Icon } from '../icons';
import { useScroll } from 'ahooks';

export const BackToTop = memo(() => {
  const scroll = useScroll(document);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const showBackToTop = useMemo(() => {
    if (scroll) {
      return scroll?.top > 200;
    }
    return false;
  }, [scroll]);
  return (
    <div
      className="back-to-top"
      onClick={handleBackToTop}
      style={{
        display: showBackToTop ? 'block' : 'none',
      }}
    >
      {/* <ArrowUpOutlined className="back-to-top-icon" /> */}
      <div className="back-to-top-icon-wrap">
        <Icon name="back-top" className="back-to-top-icon"></Icon>
      </div>
    </div>
  );
});
export default BackToTop;
