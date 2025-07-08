import {
  ICase,
  getCaseDetail,
  getCaseList,
  getExampleTypeDict,
} from '@/api/case';
import { useState, useEffect } from 'react';

import { getDownloadUrlById } from '@/api/file';
import { useAtomValue } from 'jotai';
import { templateId } from '@/stores';
import videoPoster from '@/assets/images/video-poster.webp';
const useMixins = () => {
  const [caseDetail, setCaseDetail] = useState<ICase>();

  const [caseList, setCaseList] = useState<ICase[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [detailLoading, setDetaiLoading] = useState<boolean>(true);

  const templateIdValue = useAtomValue(templateId);

  useEffect(() => {
    setListLoading(true);
    getCaseList({
      pageNum: 1,
      pageSize: 99999,
      publishStatus: 'Y',
      templateGroupIds: [templateIdValue],
    })
      .then((res) => {
        const { code, data } = res.data;
        const { list = [], total = 0 } = data || {};

        if (code == 200) {
          list.forEach((ele: ICase) => {
            ele.coverUrl = getDownloadUrlById(ele.coverId);
            ele.mobileCoverUrl = getDownloadUrlById(ele.mobileCoverId);
          });
          setCaseList(list);
          setTotal(total);
          setListLoading(false);
        }
      })
      .finally(() => {
        setListLoading(false);
      });
  }, [templateIdValue]);

  const getNewsDetail = (id: string) => {
    if (id) {
      getCaseDetail(id)
        .then((res) => {
          setDetaiLoading(true);
          if (res.data.code == 200) {
            const data = res.data.data;
            if (data) {
              data.coverUrl = getDownloadUrlById(data.coverId);
              data.mobileCoverUrl = getDownloadUrlById(data.mobileCoverId);
            }
            const resourceUrl = import.meta.env.VITE_APP_BASE_API;

            //正则匹配替换图片路径
            // 正则表达式匹配src属性
            // 本地上传的才替换，网络图片不替换
            const regex = /src="\/api([^"]*)"/g;

            data.exampleText = data.exampleText.replace(
              regex,
              (_, p1) => `src="${resourceUrl}${p1}"`
            );
            const imgRegex = /<img(.*?)>/g;
            data.exampleText = data.exampleText.replace(
              imgRegex,
              (match, p1) => {
                // 匹配style属性,添加width:100%，height:100%
                if (/style="[^"]*"/.test(p1)) {
                  p1 = p1.replace(
                    /style="[^"]*"/,
                    `style="width:100%;height:100%;"`
                  );
                } else {
                  p1 = p1.replace('>', `style="width:100%;height:100%;">`);
                }

                return `<img${p1}>`;
              }
            );

            const videoRegex = /<video(.*?)>/g;
            data.exampleText = data.exampleText.replace(
              videoRegex,
              (match, p1) => {
                if (/poster="[^"]*"/.test(p1)) {
                  p1 = p1.replace(/poster="[^"]*"/, `poster=${videoPoster}`);
                }
                //匹配 width height 替换为 100%
                p1 = p1.replace(/width="[^"]*"/, 'width="100%"');
                p1 = p1.replace(/height="[^"]*"/, 'height="100%"');
                return `<video${p1} controls playsinline>`;
              }
            );

            //
            setCaseDetail(data);
            setDetaiLoading(false);
          }
        })
        .finally(() => {
          setDetaiLoading(false);
        });
    }
  };

  return {
    getNewsDetail,
    caseDetail,
    caseList,
    total,
    listLoading,
    detailLoading,
    getExampleTypeDict,
  };
};

export default useMixins;
