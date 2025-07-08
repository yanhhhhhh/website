import { useEffect, useState } from "react";
import { useMemoizedFn } from 'ahooks';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';

// const evt = "onorientationchange" in window ? "orientationchange" : "resize";
const evt = 'resize'

const useOrientationChange = () => {


  const base = useAtomValue(baseConfig);
  const [isLandscapeFlag, setLandscapeFlag] = useState<boolean>(false);

  // const onOrientationChange = useMemoizedFn(() => {
  //   let flag = false;
  //   const type = window.screen.orientation.type;
  //   switch (type) {
  //     case 'landscape-primary':
  //     case 'landscape-secondary':
  //       flag = true;
  //       break
  //     case 'portrait-primary':
  //     case 'portrait-secondary':
  //       flag = false;
  //       break
  //     default:
  //       break
  //   }
  //   setLandscapeFlag(flag); 
  // })

  // const onResize = useMemoizedFn(() => {
  //   if (window.orientation) {
  //     let flag = false;
  //     if (window.orientation === 0 || window.orientation === 180) {
  //       flag = true;
  //     } else if (window.orientation === 90 || window.orientation === -90) {
  //       flag = false;
  //     }
  //     setLandscapeFlag(flag);
  //   }
  // })

  // 锁定竖屏方向
  // const lockPortrait = useMemoizedFn(async() => {
  // });

  // Todo，暂时根据移动端判断
  const isEqual = useMemoizedFn((num0, num1) => {
    const max = num0 > num1 ? num0 : num1;
    const min = num0 > num1 ? num1 : num0;
    
    return max / min < 1.8
  })

  const onOrientationChange = useMemoizedFn(() => {


    const data = localStorage.getItem('J-recordOrientX');
    const cw = document.documentElement.clientWidth;

    let  _Width = 0;
    let _Height = 0;
    let sw = 0;
    let sh = 0;
    if (!data) {
      sw = window.screen.width;
      sh = window.screen.height;
      _Width = sw < sh ? sw : sh;
      _Height = sw >= sh ? sw : sh;
      localStorage.setItem('J-recordOrientX',_Width + ',' + _Height);
    } else {
      const str = data.split(',');
      _Width = +str[0];
      _Height = +str[1];
    }

    if(isEqual(cw, _Width)) {
      // 竖屏
      setLandscapeFlag(false);
      return;
    }
    if(isEqual(cw, _Height)){
        // 横屏
        setLandscapeFlag(true);
        return;
    }
  }) 
  

  useEffect(() => {
    //判断手机横竖屏状态
    if (base.device.isMobile) {
      window.addEventListener(evt, onOrientationChange, false);
    }
    
    return () => {
      if (base.device.isMobile) {
        window.removeEventListener(evt, onOrientationChange, false); 
      }
    }
  }, [base.device.isMobile]);

  return {
    isLandscapeFlag,
  }
}

export {
  useOrientationChange
};
