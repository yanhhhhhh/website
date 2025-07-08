import { ICase } from '@/api/case';
import { Manual } from '@/api/download';
import { trackGather } from '@/api/track';
import { IThirdLinks } from '@/constants';
import { baseConfig } from '@/stores';
import { downloadHashMap, websiteAccessMap, websiteLinkMap } from '@/utils';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { UIMatch, useMatches } from 'react-router-dom';
import { useLocale } from './useLocale';

export const useTrackGather = () => {};
function useTrackGatherBase() {
  const matches = useMatches();
  const { localeCountryCode } = useLocale();
  const { device } = useAtomValue(baseConfig);
  const currentRouter = matches[matches.length - 1];
  const accessDevice = device.isPc ? 'PC' : 'Mobile';
  return { matches, localeCountryCode, currentRouter, accessDevice };
}
export function usePageViewTracking(isInitialized: boolean) {
  const { localeCountryCode, currentRouter, accessDevice } =
    useTrackGatherBase();
  async function pageViewTrack(current: UIMatch<unknown, unknown>) {
    const handle = current.handle as { key: string }; // 假设 key 是字符串类型

    let key = '';
    if (!handle) {
      key = current.params?.routerCode as string;
    }
    if (handle && 'key' in handle) {
      key = handle.key;
    }
    if (key && websiteAccessMap[key]) {
      const trackContent = {
        ...websiteAccessMap[key],
        matchRoute: current,
        country: localeCountryCode,
      };
      const res = await trackGather({
        eventSource: 'WEB_SITE',
        eventCode: 'WEBSITE_ACCESS',
        eventTriggerType: 'view',
        eventTime: Date.now(),
        // device: accessDevice,
        router: current.pathname,
        eventContent: JSON.stringify({
          ...trackContent,
        }),
      });
      if (res.data.code !== 200) {
        console.error('埋点失败', res.data.msg);
      }
    }
  }

  useEffect(() => {
    if (isInitialized) {
      pageViewTrack(currentRouter);
    }
  }, [currentRouter, isInitialized]);
}

export function useWebsiteDownloadTrack() {
  const { localeCountryCode, currentRouter } = useTrackGatherBase();

  async function downloadTrack(manual: Manual) {
    const trackContent = {
      operation: manual.manualKey + '手册下载',
      matchRoute: currentRouter,
      country: localeCountryCode,
      ...manual,
    };
    const res = await trackGather({
      eventSource: 'WEB_SITE',
      eventCode: 'WEBSITE_DOWNLOAD',
      eventTriggerType: 'click',
      eventTime: Date.now(),
      router: currentRouter.pathname,
      eventContent: JSON.stringify({
        ...trackContent,
      }),
    });

    if (res.data.code !== 200) {
      console.error('埋点失败', res.data.msg);
    }
  }
  return { downloadTrack };
}
export function useWebsiteLinkTrack() {
  const { localeCountryCode, currentRouter } = useTrackGatherBase();

  async function linkTrack(
    linkContent: {
      operation: string;
      operationItem?: string;
      operationItemLink?: string;
    } & Record<string, any>
  ) {
    const trackContent = {
      matchRoute: currentRouter,
      country: localeCountryCode,
      ...linkContent,
    };

    const res = await trackGather({
      eventSource: 'WEB_SITE',
      eventCode: 'WEBSITE_LINK',
      eventTriggerType: 'click',
      eventTime: Date.now(),
      router: currentRouter.pathname,
      eventContent: JSON.stringify({
        ...trackContent,
      }),
    });

    if (res.data.code !== 200) {
      console.error('埋点失败', res.data.msg);
    }
  }
  function emailTrack(email: string) {
    const linkContent = {
      ...websiteLinkMap.email,
      operationItemLink: email,
      operationItem: email.split('@')[0],
    };
    linkTrack(linkContent);
  }
  function thirdLinksTrack(item: IThirdLinks) {
    const linkContent = {
      ...websiteLinkMap.socialMedia,
      operationItemLink: item.to,
      operationItem: item.type,
    };
    linkTrack(linkContent);
  }
  function phoneTrack(phone: string) {
    const linkContent = {
      ...websiteLinkMap.phone,

      operationItem: phone,
    };
    linkTrack(linkContent);
  }

  function newsDetailClickTrack(news: ICase) {
    const linkContent = {
      ...websiteLinkMap.newsDetail,
      news,
    };
    linkTrack(linkContent);
  }
  function switchCountryTrack(country: string) {
    const linkContent = {
      ...websiteLinkMap.switchCountry,
      country,
    };
    linkTrack(linkContent);
  }
  function purchaseTrack(content: {
    operationItemLink: string;
    operationItem: string;
  }) {
    const linkContent = {
      ...websiteLinkMap.purchase,
      operationItemLink: content.operationItemLink,
      operationItem: content.operationItem,
    };
    linkTrack(linkContent);
  }
  function contactUsTrack(operationItemLink: string) {
    const linkContent = {
      ...websiteLinkMap.contactUs,
      operationItemLink,
    };
    linkTrack(linkContent);
  }
  return {
    linkTrack,
    thirdLinksTrack,
    emailTrack,
    phoneTrack,
    newsDetailClickTrack,
    switchCountryTrack,
    purchaseTrack,
    contactUsTrack,
  };
}
