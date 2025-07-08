import { Icon } from '@/components';
import { baseConfig } from '@/stores';
import { Tabs } from 'antd-mobile';
import { Swiper, SwiperRef } from 'antd-mobile/es/components/swiper/swiper';
import { SwiperItem } from 'antd-mobile/es/components/swiper/swiper-item';
import { useAtomValue } from 'jotai';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSalesKnowledgeBase } from '../../useSalesKnowledgeBase';
import SupportPcWrapper from '../pcWrapper';
import './index.less';

import { LangContentRespList } from '@/api/support';
import { Modal } from 'antd';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../videoPlayer';

const VideoTutorial: React.FC = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<LangContentRespList | null>(
    null
  );
  const params = useParams() as { type?: string; productKey?: string };
  const {
    leftList,
    currentActiveLeftKey,
    getI18nBackEndKey,
    classificationMap,
    setCurrentActiveLeftKey,
  } = useSalesKnowledgeBase({
    type: 3,
    pageSize: 999999,
    searchWithClassification: false,
  });

  const handleLeftItemClick = (i: string) => {
    setCurrentActiveLeftKey(i);
  };

  const openVideoDialog = (item: LangContentRespList) => {
    // TODO 打开视频弹窗，直接打开有兼容性问题，mp4 会直接下载，需要用 video 标签播放
    setIsModalVisible(true);
    setCurrentItem(item);

    // 新标签页打开视频链接

    // const videoUrl = item.fileUrlProxy;
    // setTimeout(() => window.open(videoUrl, '_blank'));
  };
  const mobileTabChange = useCallback(
    (key: string) => {
      const index = leftList.findIndex((item) => item === key);

      handleLeftItemClick(key);
      setActiveIndex(index);

      swiperRef.current?.swipeTo(index);
    },
    [leftList]
  );
  useEffect(() => {
    if (params.productKey && leftList.indexOf(params.productKey) > -1) {
      setTimeout(() => {
        mobileTabChange(params.productKey!);
      }, 0);
    }
  }, [params.productKey, leftList, mobileTabChange]);
  const rightList = useMemo(() => {
    const list =
      (classificationMap &&
        classificationMap?.[getI18nBackEndKey]?.[currentActiveLeftKey]) ??
      [];
    return list;
  }, [classificationMap, getI18nBackEndKey, currentActiveLeftKey]);
  const rightChildren = useMemo(() => {
    return (
      <div className="support-video-tutorial__container">
        {rightList.map((item) => {
          return (
            <div
              className="support-video-tutorial__item"
              key={item.id}
              // onClick={() => {
              //   openVideoDialog(item);
              // }}
            >
              <div className="support-video-tutorial__item__img">
                {/* <img src={item.coverFileUrlProxy} alt="cover" />
                <Icon
                  name="image-video-play"
                  className="support-video-tutorial__item__img__play"
                /> */}
                <VideoPlayer
                  options={{
                    autoplay: false,
                    controls: true,
                    // width: 100,
                    // height: 100,
                    // muted: true,
                    poster: item.coverFileUrlProxy,
                    sources: [
                      {
                        type: 'video/mp4',
                        src: item.fileUrlProxy,
                      },
                    ],
                  }}
                  // videoUrl={item.fileUrlProxy}
                />
              </div>

              <div className="support-video-tutorial__item__title">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [rightList]);
  const rightSwiperItem = useMemo(() => {
    return rightList.map((item) => {
      return (
        <div
          className="support-video-tutorial__swiper-item-container"
          key={item.id}
          // onClick={() => {
          //   openVideoDialog(item);
          // }}
        >
          <div className="support-video-tutorial__swiper-item-container__img">
            {/* <img src={item.coverFileUrlProxy} alt="cover" /> */}
            <VideoPlayer
              options={{
                autoplay: false,
                controls: true,
                // muted: true,
                poster: item.coverFileUrlProxy,
                sources: [
                  {
                    type: 'video/mp4',
                    src: item.fileUrlProxy,
                  },
                ],
              }}
            />
            {/* <Icon
              name="image-video-play"
              className="support-video-tutorial__swiper-item-container__img__play"
            /> */}
          </div>
          <div className="support-video-tutorial__swiper-item-container_title">
            {item.title}
          </div>
        </div>
      );
    });
  }, [rightList]);

  return (
    <div className="support-video-tutorial" id="HeroEESupport_video-tutorial">
      <div>
        {device.isPc ? (
          <SupportPcWrapper
            title={t('support.videoTutorials')}
            leftList={leftList}
            leftItemClick={handleLeftItemClick}
            rightChildren={rightChildren}
          />
        ) : (
          <div className="support-video-tutorial-mobile">
            <div className="support-mobile__title">
              {t('support.videoTutorials')}
            </div>
            <div>
              <Tabs
                className="support-tabs"
                activeKey={leftList[activeIndex]}
                onChange={(key) => {
                  mobileTabChange(key);
                }}
              >
                {leftList.map((item) => (
                  <Tabs.Tab title={item} key={item} />
                ))}
              </Tabs>
              <Swiper
                className="support-video-tutorial-mobile__swiper"
                direction="horizontal"
                loop
                indicator={() => null}
                ref={swiperRef}
                defaultIndex={activeIndex}
                onIndexChange={(index) => {
                  setActiveIndex(index);
                  handleLeftItemClick(leftList[index]);
                }}
              >
                {leftList.length > 0 ? (
                  leftList.map((i) => (
                    <SwiperItem
                      key={i}
                      className="support-video-tutorial__swiper-item"
                    >
                      {rightSwiperItem}
                    </SwiperItem>
                  ))
                ) : (
                  <SwiperItem className="support-video-tutorial__swiper-item">
                    <div className="support-video-tutorial__empty">
                      {t('support.noVideo')}
                    </div>
                  </SwiperItem>
                )}
              </Swiper>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
        className="support-video-tutorial__modal"
        destroyOnClose
        closable
        title={<></>}
      >
        <video
          id="current-video"
          className="support-video-tutorial__modal__video"
          poster={currentItem?.coverFileUrlProxy}
          controlsList="nodownload"
          webkit-playsinline
          playsInline={true}
          controls
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          x5-video-player-style="fullscreen"
          x-webkit-airplay="allow"
          x5-playsinline
          onCanPlay={(i) => {
            i.currentTarget.play();
          }}
        >
          <source src={currentItem?.fileUrlProxy}></source>
          您的浏览器不支持 video 标签。
        </video>
      </Modal>
    </div>
  );
};

export default VideoTutorial;
