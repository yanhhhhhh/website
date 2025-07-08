import { useEffect, useState } from 'react';

function getDevice(w: number) {
  const device = {
    isMobile: false,
    isTablet: false,
    isPc: false,
  };

  if (w <= 414) {
    return {
      ...device,
      isMobile: true,
    };
  } else if (w <= 1024) {
    return {
      ...device,
      isTablet: true,
    };
  } else {
    return {
      ...device,
      isPc: true,
    };
  }
}
export const useCanvasWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [device, setDevice] = useState(getDevice(width));
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setDevice(getDevice(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return { width, device };
};
