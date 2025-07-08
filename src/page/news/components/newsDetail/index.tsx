import { baseConfig } from '@/stores';
import { LeftOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Space } from 'antd';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './index.module.less';

import { useLocale, useWebsiteLinkTrack } from '@/hooks';
import { useTranslation } from 'react-i18next';
import useMixins from '../../mixins';

import { EditorContentView } from '@/components';
import dayjs from 'dayjs';
import { ICase } from '@/api/case';

const NewsDetail = () => {
  const { id } = useParams();
  const base = useAtomValue(baseConfig);

  const { t } = useTranslation();

  const { navigateTo } = useLocale();

  const { getNewsDetail, caseDetail, caseList, total, detailLoading } =
    useMixins();
  const { newsDetailClickTrack } = useWebsiteLinkTrack();
  const onBackClick = useCallback(() => {
    navigateTo(`/aboutUs/news`);
  }, [navigateTo]);

  const onCaseClick = useCallback(
    (c: ICase) => {
      newsDetailClickTrack(c);
      navigateTo(`/detail/${c.id}`);
    },
    [navigateTo, newsDetailClickTrack]
  );

  useEffect(() => {
    if (id) {
      getNewsDetail(id);
    }
  }, [id]);

  //不显示当前新闻
  const newCaseList = useMemo(() => {
    return caseList.filter((ele) => ele.id !== id);
  }, [caseList, id]);
  return (
    <div className={Styles['news-detail']}>
      {!base.device.isMobile ? (
        <Space className={Styles['top-bar']} onClick={onBackClick}>
          <LeftOutlined />
          <span>{t('case.back')}</span>
        </Space>
      ) : null}
      {detailLoading ? (
        <Skeleton
          active={detailLoading}
          paragraph={{ width: '100%', rows: 4 }}
        ></Skeleton>
      ) : (
        <Flex
          className={Styles['news-detail__container']}
          vertical={base.device.isMobile}
        >
          <div className={Styles['news-detail__content']}>
            <h3 className={Styles['article_title']}>
              {caseDetail?.exampleTitle}
            </h3>
            <p className={Styles['article_desc']}>
              {/* {formatDate(caseDetail?.showTimeStart || '')}
               */}
              {dayjs(caseDetail?.showTimeStart).format('YYYY-MM-DD HH:mm:ss')}
            </p>
            <div className={Styles['article_content']}>
              <EditorContentView html={caseDetail?.exampleText || ''} />
              {/* {ReactHtmlParser(sanitizedData)} */}
            </div>
          </div>
          {total > 0 ? (
            <div className={Styles['right']}>
              {base.device.isMobile ? (
                <h3 className={Styles['right-title']}>{t('case.more')}</h3>
              ) : null}
              <Flex
                className={Styles['news-detail__list']}
                vertical={!base.device.isMobile}
              >
                {newCaseList.slice(0, 6).map((ele) => (
                  <div className={Styles['case']} key={ele.id}>
                    {ele.coverType === 'IMG' ? (
                      <img
                        src={
                          base.device.isMobile
                            ? ele.mobileCoverUrl
                            : ele.coverUrl
                        }
                      />
                    ) : null}
                    {ele.coverType === 'VIDEO' ? (
                      <video
                        width={276}
                        height={183}
                        src={
                          base.device.isMobile
                            ? ele.mobileCoverUrl
                            : ele.coverUrl
                        }
                      />
                    ) : null}
                    <h3
                      className={`${base.device.isMobile ? '' : 'ellipsis'} ${
                        Styles['case-title']
                      }`}
                      onClick={() => onCaseClick(ele)}
                    >
                      {ele.exampleTitle}
                    </h3>
                    {base.device.isMobile ? null : (
                      <p className={Styles['case-desc']}>{ele.description}</p>
                    )}
                  </div>
                ))}
              </Flex>
            </div>
          ) : null}
        </Flex>
      )}
    </div>
  );
};

export default NewsDetail;
