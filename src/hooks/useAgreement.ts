import {
  AgreementObject,
  getDetailHtml,
  getExternalHtmlById,
  getList,
} from '@/api/agrreement';
import { FileType, agreement, fileType } from '@/constants';

import {
  agreementList,
  agreementMap,
  isInitializedAgreementAtom,
} from '@/stores';
import { useAsyncEffect } from 'ahooks';

import { useAtom, useSetAtom } from 'jotai';

import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useAgreement = () => {
  const { locale } = useParams();

  const setAgreementList = useSetAtom(agreementList);
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAgreementAtom);
  const [agreementMapValue, setAgreementMap] = useAtom(agreementMap);

  function getAgreementList() {
    return getList({ pageNum: 1, pageSize: 10, termsType: 'WEB' }).then(
      (res) => {
        const { code, data } = res.data;
        const { list = [] } = data;
        if (code === 200) {
          setAgreementList(list);
          const map = list.reduce(
            (acc, cur) => {
              if (fileType.includes(cur.fileType)) {
                if (cur.language === '1')
                  acc['en_US'][cur.fileType as FileType] = cur;
                if (cur.language === '2')
                  acc['zh_CN'][cur.fileType as FileType] = cur;
              }

              return acc;
            },
            { en_US: {}, zh_CN: {} } as Record<
              'en_US' | 'zh_CN',
              Record<FileType, AgreementObject>
            >
          );
          setIsInitialized(true);
          setAgreementMap(map);

          return map;
        }
        return { en_US: {}, zh_CN: {} };
      }
    );
  }
  /**
   * 获取当前协议详情
   */
  const getCurrentAgreement = useCallback(
    (url: string) => {
      const tempAgreement = url.split('/')[2] as keyof typeof agreement.zh_CN;
      // 如果是中国大陆，就显示中文（，否则显示英文(其他国家默认显示英文)
      //todo 待接口兼容模板，再使用模板id
      const tempLocale =
        locale === 'zh_CN' ? 'zh_CN' : ('en_US' as keyof typeof agreement);
      const fileType = tempAgreement.toUpperCase() as FileType;

      const agreementData = agreementMapValue[tempLocale][fileType];

      return agreementData;
    },
    [agreementMapValue, locale]
  );
  /**
   * 获取协议详情页面路径
   */
  const getAgreementPath = useCallback(
    (url: string) => {
      const agreementData = getCurrentAgreement(url);
      const path = getDetailHtml(agreementData.id);
      return path;
    },
    [getCurrentAgreement]
  );
  const getAgreementId = useCallback(
    (url: string) => {
      return getCurrentAgreement(url).id;
    },
    [getCurrentAgreement]
  );

  const goToAgreementPage = useCallback(
    async (url: string) => {
      const id = getAgreementId(url);
      getExternalHtmlById(id); //fix:pwa 缓存api
      // fetch(
      //   `${window.location.origin}${
      //     import.meta.env.VITE_APP_BASE_API
      //   }/regionWeb/webTermsInfo/getTextById/${id}`
      // )
      //   .then((response) => response.text())
      //   .then((html) => {
      //     // const newWindow = window.open('about:blank', '_blank');

      //     // newWindow?.document.write(html);
      //     // newWindow?.document.close();
      //     // 创建一个临时 <a> 元素
      //     const link = document.createElement('a');
      //     link.href =
      //       'data:text/html;charset=utf-8,' + encodeURIComponent(html); // 使用 data URI 加载 HTML 内容
      //     link.target = '_blank'; // 设置为新窗口打开
      //     link.rel = 'noopener noreferrer'; // 添加安全性保护

      //     // 模拟点击行为
      //     document.body.appendChild(link); // 添加到 DOM 中
      //     link.click(); // 触发点击事件
      //     document.body.removeChild(link); // 移除临时元素
      //   })
      //   .catch((error) => console.error('Error:', error));
      window.open(
        `${window.location.origin}${
          import.meta.env.VITE_APP_BASE_API
        }/regionWeb/webTermsInfo/getTextById/${id}`,
        '_blank',
        'noopener noreferrer'
      );
    },
    [getAgreementId]
  );
  return {
    getAgreementList,
    agreementMapValue,
    getCurrentAgreement,
    getAgreementPath,
    getAgreementId,
    goToAgreementPage,
  };
};
