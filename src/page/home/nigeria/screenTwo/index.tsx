import {
  nigeriaScreenTwoList,
  nigeriaScreenTwoMobileList,
} from '@/constants/nigeria';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import './index.less';
export const NigeriaScreenTwo = () => {
  const { device } = useAtomValue(baseConfig);
  const list = useMemo(() => {
    return device.isPc ? nigeriaScreenTwoList : nigeriaScreenTwoMobileList;
  }, [device]);
  return (
    <div className="nigeria-screen-two">
      <div className="title">HeroEE In Africa</div>
      <div className="list">
        {list.map((item, index) => {
          return (
            <div
              key={item.text + index}
              className="image"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <p className="text">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NigeriaScreenTwo;
