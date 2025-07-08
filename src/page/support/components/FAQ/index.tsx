import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSalesKnowledgeBase } from '../../useSalesKnowledgeBase';
import SupportPcWrapper from '../pcWrapper';
import './index.less';
import { List } from 'antd';
import { getKnowledgeList, LangContentRespList } from '@/api/support';
import { groupByLocaleAndClassification } from '../../utils';
import './index.less';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { Collapse, Swiper, SwiperRef, Tabs } from 'antd-mobile';
import { SwiperItem } from 'antd-mobile/es/components/swiper/swiper-item';
import { useParams } from 'react-router-dom';
const defaultPageSize = 6;
const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);

  const [list, setList] = useState<LangContentRespList[]>([]);
  const [queryParams, setQueryParams] = useState({
    pageNum: 1,
    pageSize: defaultPageSize,
    type: 2,
  });
  const [total, setTotal] = useState(0);
  const { leftList, getI18nBackEndKey, classificationMap, loading } =
    useSalesKnowledgeBase({
      type: 2,
      pageSize: 10,
    });

  const [activeKey, setActiveKey] = useState<string>('');
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useParams() as { type?: string; productKey?: string };
  useEffect(() => {
    // 初始化
    if (leftList && leftList.length > 0 && !activeKey && classificationMap) {
      setActiveKey(leftList[0]);
      const cur = classificationMap?.[getI18nBackEndKey]?.[leftList[0]] ?? [];
      setTotal(cur.length);

      setList(cur.slice(0, defaultPageSize));
    }
  }, [
    activeKey,
    classificationMap,
    getI18nBackEndKey,
    leftList,
    params.productKey,
  ]);
  useEffect(() => {
    if (params.productKey && leftList.indexOf(params.productKey) > -1) {
      mobileTabChange(params.productKey);
    }
  }, [params.productKey, leftList]);
  const mobileTabChange = (key: string) => {
    const index = leftList.findIndex((item) => item === key);
    handleLeftItemClick(key);
    setActiveIndex(index);
    swiperRef.current?.swipeTo(index);
  };
  const handleLeftItemClick = async (i: string) => {
    setActiveKey(i);
    const res = await getKnowledgeList({
      ...queryParams,
      pageNum: 1,
      classification: i,
    });
    const { data } = res;
    if (data.code === 200) {
      const d = groupByLocaleAndClassification(data.data.list);
      const l = d[getI18nBackEndKey]?.[i] ?? [];
      setList(l);
      setQueryParams({
        ...queryParams,
        pageNum: 1,
      });
      setTotal(data.data.total);
    }
  };
  const loadMoreData = async () => {
    const res = await getKnowledgeList({
      ...queryParams,
      pageNum: queryParams.pageNum + 1,
      classification: activeKey,
    });
    const { data } = res;
    if (data.code === 200) {
      const d = groupByLocaleAndClassification(data.data.list);
      const l = d[getI18nBackEndKey]?.[activeKey] ?? [];
      setList([...list, ...l]);
      setQueryParams({
        ...queryParams,
        pageNum: queryParams.pageNum + 1,
      });
      setTotal(data.data.total);
    }
  };
  function collapse() {
    setList((pre) => pre.slice(0, defaultPageSize));
    setQueryParams({
      ...queryParams,
      pageNum: 1,
    });
  }
  const loadMore =
    list.length < total ? (
      <div className="support-faq-right__button" onClick={loadMoreData}>
        {t('button.learnMore') + ' >'}
      </div>
    ) : total > defaultPageSize ? (
      <div className="support-faq-right__button" onClick={collapse}>
        {t('button.collapse') + ' >'}
      </div>
    ) : null;

  const rightChildren = useMemo(() => {
    if (!activeKey) return null;
    const defaultActiveKey = [list[0]?.id];
    return (
      <div className="support-faq-right">
        {device.isPc ? (
          <List
            className="loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => {
              return (
                <div className="loadmore-list-item">
                  <h3 className="loadmore-list-item__question">
                    {item.question}
                  </h3>
                  <p className="loadmore-list-item__answer">{item.answer}</p>
                </div>
              );
            }}
          />
        ) : (
          <>
            <Collapse
              className="support-collapse"
              defaultActiveKey={defaultActiveKey}
            >
              {list.map((item) => (
                <Collapse.Panel
                  className="support-collapse__item"
                  title={item.question}
                  key={item.id}
                >
                  <p className="support-collapse__item__answer">
                    {item.answer}
                  </p>
                </Collapse.Panel>
              ))}
            </Collapse>
            {loadMore}
          </>
        )}
      </div>
    );
  }, [activeKey, loading, list]);

  return (
    <div className="support-faq" id="HeroEESupport_faq">
      <div>
        {device.isPc ? (
          <SupportPcWrapper
            title={t('support.commonQuestions')}
            leftList={leftList}
            leftItemClick={handleLeftItemClick}
            rightChildren={rightChildren}
          />
        ) : (
          <div className="support-faq-mobile">
            <div className="support-mobile__title">
              {t('support.commonQuestions')}
            </div>
            <div>
              <Tabs
                className="support-tabs"
                activeKey={leftList[activeIndex]}
                onChange={(key) => {
                  mobileTabChange(key);
                }}
              >
                {leftList.map((item, index) => (
                  <Tabs.Tab
                    title={<div className="title">{item}</div>}
                    key={item}
                  />
                ))}
              </Tabs>
              <Swiper
                className="support-faq-mobile__swiper"
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
                      {rightChildren}
                    </SwiperItem>
                  ))
                ) : (
                  <SwiperItem className="support-video-tutorial__swiper-item">
                    <div className="support-video-tutorial__empty">
                      {t('support.noFAQ')}
                    </div>
                  </SwiperItem>
                )}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
