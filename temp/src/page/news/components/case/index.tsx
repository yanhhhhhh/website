import type { ICase } from '@/api/case';
import { getExampleTypeDict } from '@/api/case';
import { DictType } from '@/api/dict';
import { baseConfig } from '@/stores';
import { Carousel, Skeleton } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import useMixins from '../../mixins';
import { CaseCard } from '../caseCard';
import './index.less';
import { splitArrayIntoChunks } from '@/utils';
import { CarouselArrow } from '@/components';
import { exampleTypeAtom } from '@/stores/case';
import { useLocale } from '@/hooks';

const Case = () => {
  const { device } = useAtomValue(baseConfig);

  const { caseList, listLoading } = useMixins();
  const [exampleType, setExampleType] = useAtom(exampleTypeAtom);
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale } = useLocale();

  const list = useMemo(() => {
    return caseList.map((ele: ICase) => {
      return {
        ...ele,
        coverUrl: device.isMobile ? ele.mobileCoverUrl : ele.coverUrl,
      };
    });
  }, [caseList, device.isMobile]);

  const caseMap = useMemo(() => {
    const map: Record<string, ICase[]> = {};
    exampleType.forEach((ele) => {
      map[ele.dictValue] = [];
    });
    list?.forEach((ele: ICase) => {
      map[ele.exampleType] instanceof Array && map[ele.exampleType].push(ele);
    });

    return map;
  }, [exampleType, list]);

  useEffect(() => {
    getExampleTypeDict().then((res) => {
      const { code, data } = res.data;

      if (code == 200) {
        setExampleType(data);
      }
    });
  }, [locale]);

  const onAnchorClick = (item: DictType, index: number) => {
    const anchorElement = document.getElementById(item.dictValue);
    const anchorFixed = document.getElementById('anchor-wrapper');

    const anchorFixedHeight = anchorFixed?.offsetHeight || 0;
    const navElement = document.getElementById('hero-nav');
    const navElementHeight = navElement?.offsetHeight || 0;

    if (anchorElement) {
      setActiveIndex(index);
      document.documentElement.scrollTo({
        behavior: 'smooth',
        top: anchorElement.offsetTop - anchorFixedHeight - navElementHeight,
      });
    }
  };
  // const fixTop = useMemo(() => {
  //   return device.isPc ? '0.64rem' : ' 0.8rem';
  // }, [device]);
  // useEffect(() => {
  //   const anchorElement = document.getElementById('anchor-wrapper');
  //   const navElement = document.getElementById('hero-nav');
  //   const navElementHeight = navElement?.offsetHeight || 0;
  //   const bannerElement = document.getElementById('hero-news-banner');
  //   const bannerElementHeight = bannerElement?.offsetHeight || 0;
  //   const height = navElementHeight + bannerElementHeight;

  //   const offset = {
  //     top: 100,
  //     bottom: 20,
  //   };

  //   function scrollHandler() {
  //     if (anchorElement) {
  //       // const rect = anchorElement.getBoundingClientRect();
  //       if (document.documentElement.scrollTop > height) {
  //         //   rect.top < navElementHeight

  //         anchorElement.style.position = 'fixed';
  //         anchorElement.style.top = fixTop;
  //         anchorElement.style.zIndex = '1000';
  //       } else {
  //         anchorElement.style.position = 'static';
  //       }
  //     }
  //     exampleType.forEach((item, index) => {
  //       const ele = document.getElementById(item.dictValue);
  //       if (ele) {
  //         const rect = ele.getBoundingClientRect();
  //         const anchor = document.querySelector(
  //           `.anchor.anchor-${item.dictValue}`
  //         );
  //         if (rect.top < offset.top) {
  //           // && rect.bottom > offset.bottom
  //           if (anchor) {
  //             setActiveIndex(index);
  //           }
  //         } else {
  //           if (anchor) {
  //             // setActiveIndex(0);
  //           }
  //         }
  //       }
  //     });
  //   }
  //   window.addEventListener('scroll', scrollHandler);
  //   return () => {
  //     window.removeEventListener('scroll', scrollHandler);
  //   };
  // }, [exampleType, fixTop]);

  return (
    <>
      {listLoading ? (
        <Skeleton
          active={listLoading}
          paragraph={{ width: '100%', rows: 4 }}
        ></Skeleton>
      ) : (
        <>
          <div className="anchor-wrapper" id="anchor-wrapper">
            {exampleType.map((item, index) => {
              return (
                caseMap[item.dictValue].length > 0 && (
                  <div
                    className={`anchor ${
                      activeIndex === index ? 'anchor-active' : ''
                    } anchor-${item.dictValue}`}
                    key={index}
                    onClick={() => onAnchorClick(item, index)}
                  >
                    {item.dictLabel}
                  </div>
                )
              );
            })}
          </div>
          <div className="news-content">
            {exampleType.map((item, index) => {
              return (
                caseMap[item.dictValue].length > 0 && (
                  <div key={index} id={item.dictValue} className="news-case">
                    <h2>{item.dictLabel}</h2>

                    <div className="news-case-wrapper">
                      {device.isPc ? (
                        <Carousel
                          arrows={caseMap[item.dictValue].length > 0}
                          effect="fade"
                          dots={false}
                          infinite={false}
                          // autoplay
                          // infinite={true}
                          // pauseOnHover // 鼠标移上去停止自动播放
                          nextArrow={
                            <CarouselArrow
                              direction="next"
                              iconStyle={{
                                color: '#1761ff',
                              }}
                            />
                          }
                          prevArrow={
                            <CarouselArrow
                              direction="prev"
                              iconStyle={{
                                color: '#1761ff',
                              }}
                            />
                          }
                        >
                          {splitArrayIntoChunks(caseMap[item.dictValue], 6).map(
                            (ele, index) => {
                              return <CaseChunk key={index} list={ele} />;
                            }
                          )}
                        </Carousel>
                      ) : (
                        <Carousel dots={true} autoplaySpeed={5000}>
                          {caseMap[item.dictValue].map((ele, index) => {
                            return <CaseCard key={index} {...ele}></CaseCard>;
                          })}
                        </Carousel>
                      )}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Case;
function CaseChunk({ list }: { list: ICase[] }) {
  return (
    <>
      <div className="case-chunk-wrapper">
        {list.map((ele, index) => {
          return <CaseCard key={index} {...ele}></CaseCard>;
        })}
      </div>
    </>
  );
}
// caseMap[item.dictValue].map((ele, index) => {
//   return <CaseCard key={index} {...ele}></CaseCard>;
// })
