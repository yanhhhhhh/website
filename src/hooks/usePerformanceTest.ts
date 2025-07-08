import { useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';

const usePerformanceTest = () => {
  const [startTime, setStartTime] = useState<number>();

  const getExcuteTime = useMemoizedFn(() => {
    return window.performance.now() - (startTime || 0)
  })

  const showPerformance = useMemoizedFn((title: string = 'excuteTime') => {
    const p = document.createElement('p');
    const excuteTime = getExcuteTime();
    p.innerHTML = `${title}: ${excuteTime}ms`;
    let d = document.body.querySelector('.stats');
    if (!d) {
      d = document.createElement('div');
      d.classList.add('stats');
      (d as HTMLDivElement).style.cssText = `position: fixed; top: 0; right: 0; z-index: 33; font-size: 12px`;
      d.appendChild(p);
    
      document.body.appendChild(d);
    } else {
      d.innerHTML = '';
      d.appendChild(p);
    
      document.body.appendChild(d);
    }

    d.appendChild(p);
    
    document.body.appendChild(d);
  })

  const clearTestState = useMemoizedFn(() => {
    const d = document.body.querySelector('.stats');
    if (d) {
      document.body.removeChild(d);
    }
  })

  useEffect(() => {
    setStartTime(window.performance.now());

    return () => {
      
      clearTestState();
    }
  }, [])


  return {
    setStartTime,
    getExcuteTime,
    showPerformance
  }
}

export {
  usePerformanceTest
}