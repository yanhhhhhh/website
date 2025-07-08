import React, { useEffect } from 'react';
import './index.less';
import { useParams } from 'react-router-dom';

export interface SupportPcWrapperProps {
  title?: string;
  leftList: string[];
  leftItemClick?: (i: string, index?: number) => void;
  rightChildren: React.ReactNode;
  currentLeftIndex?: number;
}
const SupportPcWrapper = (props: SupportPcWrapperProps) => {
  const { title, rightChildren, leftList, leftItemClick } = props;
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const params = useParams() as { type?: string; productKey?: string };
  function handleLeftItemClick(i: string, index: number) {
    leftItemClick && leftItemClick(i, index);
    setCurrentIndex(index);
  }
  useEffect(() => {
    if (params.productKey && leftList.indexOf(params.productKey) > -1) {
      handleLeftItemClick(
        params.productKey,
        leftList.indexOf(params.productKey)
      );
    }
  }, [params.productKey, leftList]);

  return (
    <div className="support-pc-wrapper">
      <div className="support-pc-wrapper__title">{title}</div>
      <div className="support-pc-wrapper__content">
        <div className="support-pc-wrapper__left">
          {leftList.map((item, index) => (
            <div
              key={index}
              className={`support-pc-wrapper__left-item ${
                currentIndex === index
                  ? 'support-pc-wrapper__left-item--active'
                  : ''
              }`}
              onClick={() => {
                handleLeftItemClick(item, index);
              }}
            >
              <div className="support-pc-wrapper__left-item-title">{item}</div>
            </div>
          ))}
        </div>
        <div className="support-pc-wrapper__right">{rightChildren}</div>
      </div>
    </div>
  );
};

export default SupportPcWrapper;
