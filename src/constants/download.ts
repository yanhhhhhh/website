import downloadBg from '@/assets/images/download/bannerBg.png';
import bannerAppMobile from '@/assets/images/download/bannerAppMobile.png';
import bannerAppMobileEn from '@/assets/images/download/bannerAppMobileEn.png';

import bannerApp from '@/assets/images/download/bannerApp.png';
import bannerAppEn from '@/assets/images/download/bannerAppEn.png';

import allProduction from '@/assets/images/allProduction.png';
import allProductionEn from '@/assets/images/en/allProduction.png';

import appFunctionBg from '@/assets/images/download/appFunctionBg.png';
import appFunction1 from '@/assets/images/download/appFunction1.png';
import appFunction2 from '@/assets/images/download/appFunction2.png';
import appFunction3 from '@/assets/images/download/appFunction3.png';
import appFunction4 from '@/assets/images/download/appFunction4.png';
import appFunctionEn1 from '@/assets/images/download/appFunctionEn1.png';
import appFunctionEn2 from '@/assets/images/download/appFunctionEn2.png';
import appFunctionEn3 from '@/assets/images/download/appFunctionEn3.png';
import appFunctionEn4 from '@/assets/images/download/appFunctionEn4.png';

export const downloadBanner = {
  title: 'HeroEE APP',
  titleKey: 'downloadPage.bannerTitle',

  bgImage: downloadBg,
  MobielImage: bannerAppMobile,
  image: {
    pc: {
      zh: bannerApp,
      en: bannerAppEn,
    },
    mobile: {
      zh: bannerAppMobile,
      en: bannerAppMobileEn,
    },
  },
  description: [
    {
      text: '全面监测您设备的用电情况，设备参数及设备控制等',
      key: 'downloadPage.monitoringDevicePowerConsumptionParametersAndControl',
    },
  ],

  downloads: [
    {
      text: 'app Store下载',
      key: 'downloadPage.appStoreDownload',
      iconKey: 'appStore',
      type: 'link',
      herf: 'https://testflight.apple.com/join/DsBG8ZqH',
    },
    {
      text: '安卓apk文件',
      key: 'downloadPage.androidApk',
      iconKey: 'android',
      type: 'link',
      herf: 'https://www.pgyer.com/zap3P7',
    },
    {
      text: '下载用户手册',

      key: 'downloadPage.downloadUserManual',
      type: 'anchor',
      herf: 'download/manual',
    },
  ],
};
//户用储能用电管理
export const downloadHouseholdEnergyStorage = {
  title: '户用储能用电管理',
  titleKey: 'downloadPage.householdEnergyStorage',
  description: '实时掌握用电情况',
  descriptionKey: 'downloadPage.realTimeGraspPowerConsumption',
  image: allProduction,
  enImage: allProductionEn,
};
//APP 功能
export const downloadAppFunction = {
  title: '更多APP功能全掌握',
  titleKey: 'downloadPage.moreAppFunctions',
  bgImage: appFunctionBg,
  items: [
    {
      title: '概览',
      titleKey: 'downloadPage.overview',
      image: appFunction1,
      enImage: appFunctionEn1,

      description: [
        {
          text: '多设备管理',
          key: 'downloadPage.multipleDeviceManagement',
        },
        {
          text: '实时掌握用电情况',
          key: 'downloadPage.realTimeGraspPowerConsumption',
        },
      ],
    },
    {
      title: '控制',
      titleKey: 'downloadPage.control',
      image: appFunction2,
      enImage: appFunctionEn2,
      description: [
        {
          text: '远程控制',
          key: 'downloadPage.remoteControl',
        },
        {
          text: '远程管控设备与电量使用',
          key: 'downloadPage.remoteControlDeviceAndPowerConsumption',
        },
      ],
    },
    {
      title: '分享',
      titleKey: 'downloadPage.share',
      image: appFunction3,
      enImage: appFunctionEn3,
      description: [
        {
          text: '随心分享 ',
          key: 'downloadPage.shareAtWill',
        },
        {
          text: '分享设备给家人朋友设备',
          key: 'downloadPage.shareDeviceWithFamilyAndFriends',
        },
      ],
    },
    {
      title: '个人中心',
      titleKey: 'downloadPage.personalCenter',
      image: appFunction4,
      enImage: appFunctionEn4,
      description: [
        {
          text: '持续升级',
          key: 'downloadPage.continuousUpgrade',
        },
        {
          text: '更多功能持续更新',
          key: 'downloadPage.moreFunctionsContinuouslyUpdated',
        },
      ],
    },
  ],
};
//手册
export const downloadManual = {
  title: '手册',
  titleKey: 'downloadPage.userManual',
  items: [],
};
