import { downloadManual } from '@/constants';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

import {
  Manual,
  TManualType,
  getManualList,
  getManualsType,
} from '@/api/download';
import { download, getFile } from '@/api/file';
import { Icon } from '@/components';
import { baseConfig, templateId } from '@/stores';
import { Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocale, useWebsiteDownloadTrack } from '@/hooks';
import { useParams } from 'react-router-dom';

const UserManual = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<TManualType[]>([]);
  const [activeKey, setActiveKey] = useState('');
  const [contentList, setContentList] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(false);
  const templateIdValue = useAtomValue(templateId);
  const { locale } = useLocale();
  const params = useParams() as { type?: string; productKey?: string };

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const { downloadTrack } = useWebsiteDownloadTrack();
  async function downloadAction(item: Manual) {
    window.open(item.manualUrl);

    downloadTrack(item);

    // if (device.isPc) {
    //   download(
    //     manualRes.data.data.fileUrlProxy,
    //     item.manualName + '.' + item.manualFileType
    //   );
    // } else {
    //   window.open(manualRes.data.data.fileUrlProxy);
    // }
  }
  async function fetchManualList() {
    getManualList({
      pageNum: 1,
      pageSize: 10000,
      manualKey: activeKey,
      checkStatus: 'Y',
      isPublish: 'Y',
      templateGroupIds: [templateIdValue],
    }).then(async (res) => {
      const { code, data } = res.data;
      if (code === 200) {
        setContentList(data.list ?? []);
      }
    });
  }
  async function fetchManualType() {
    const res = await getManualsType();
    if (res.data.code === 200) {
      setItems(res.data.data ?? []);
      console.log('params.productKey', params.productKey);

      setActiveKey(params.productKey ?? res.data.data[0].manualKey);
    }
  }
  async function initData() {
    setLoading(true);
    try {
      await fetchManualType();
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  }
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (activeKey) {
      fetchManualList();
    }
  }, [activeKey, templateIdValue]);
  useEffect(() => {
    fetchManualType();
  }, [locale]);
  return (
    <div className={style.manual}>
      <h1 className={style.title}>{t(downloadManual.titleKey)}</h1>

      <div className={style['tab-nav-wrap']}>
        <div className={style['tab-nav-list']}>
          {items.map((item) => (
            <div
              className={`${style['tab-nav-item']} ${
                item.manualKey == activeKey ? style['tab-nav-item-active'] : ''
              }`}
              key={item.manualKey}
              onClick={() => onChange(item.manualKey)}
            >
              {t(item.manualType)}
            </div>
          ))}
        </div>
      </div>
      <Spin spinning={loading}>
        <div className={style['content-wrap']}>
          {contentList.map((item) => (
            <div className={style['content-item-wrap']} key={item.manualId}>
              <div className={style['content-item']}>
                <Icon className={style['content-item-icon']} name="pdf"></Icon>
                <div className={style['content-item-center']}>
                  <div className={style['content-item-name']}>
                    {item.manualName}
                  </div>
                  <div className={style['content-item-time']}>
                    {item.publishTime &&
                      new Date(item.publishTime)
                        .toLocaleDateString()
                        .replace(/\//g, '-')}
                  </div>
                </div>
              </div>

              <a
                className={style['content-item-download']}
                onClick={() => {
                  downloadAction(item);
                }}
              >
                <Icon
                  className={style['content-item-download-icon']}
                  name="download"
                ></Icon>
                {item.manualFileType.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default UserManual;
