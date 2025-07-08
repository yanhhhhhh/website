import { useParams } from 'react-router-dom';
import SupportBannner from './components/banner';
import SupportContact from './components/contact';
import FAQ from './components/FAQ';
import ServicePolicy from './components/servicePolicy';
import VideoTutorial from './components/videoTutorial';
import './index.less';
import { useEffect, useLayoutEffect } from 'react';
import { scrollToElement } from '@/utils/scroll';
const Support = () => {
  const params = useParams() as { type?: string };
  const anchor = params.type;
  useLayoutEffect(() => {
    if (anchor) {
      setTimeout(() => {
        scrollToElement(`HeroEESupport_${anchor}`);
      }, 500);
    }
  }, [anchor]);
  // useEffect(() => {
  //   if (!anchor) return;

  //   const elementId = `HeroEESupport_${anchor}`;
  //   let retries = 10;

  //   const tryScroll = () => {
  //     const element = document.getElementById(elementId);
  //     console.log('element', element);

  //     if (element) {
  //       const rect = element.getBoundingClientRect();
  //       const scrollTop = rect.top + document.documentElement.scrollTop;
  //       document.documentElement.scrollTo({
  //         top: scrollTop - window.innerHeight / 2 + rect.height / 2,
  //         behavior: 'smooth',
  //       });
  //     } else if (retries > 0) {
  //       retries--;
  //       requestAnimationFrame(tryScroll);
  //     }
  //   };

  //   tryScroll();
  // }, [anchor]);

  return (
    <div className="hero-support-page">
      <SupportBannner />
      <div className="support-content">
        {/* <ServicePolicy /> */}
        <FAQ />
        <VideoTutorial />
      </div>
      <SupportContact />
    </div>
  );
};

export default Support;
