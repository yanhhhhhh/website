import type { IconName } from '@/components/icons';
import { globalEmail } from '@/constants';

export const getChangingPics = (
  picName: string,
  frameNum: number,
  isMobile: boolean
) => {
  const pcPath = `/images/pc/charging/`;
  const mobilePath = `/images/mobile/charging/`;
  const path = isMobile ? mobilePath : pcPath;

  const pics = [];
  for (let i = 0; i <= frameNum; i++) {
    const s = i < 10 ? `0${i}` : i;
    pics.push(`${path}${picName}${s}.jpg`);
  }

  return pics;
  /*   const imageModules = isMobile
    ? import.meta.glob<boolean, string, { default: string }>(
        `@scroll-animation-images/mobile/charging/*.jpg`,
        {
          eager: true,
        }
      )
    : (import.meta.glob<boolean, string, { default: string }>(
        `@scroll-animation-images/pc/charging/*.jpg`,
        { eager: true }
      ) as unknown as Record<
        string,
        () => {
          default: string;
        }
      >);

  const pics = Object.values(imageModules).map((module) => {
    return module.default;
  });
  return pics; */
};

interface Opt {
  name: string;
  value: string;
  translate?: string;
}

export interface BaseDesc {
  title: string;
  translate: string;
  icon?: IconName;
}

// app 特性
export const appIntro: {
  header: BaseDesc;
  features: BaseDesc[];
  summarys: BaseDesc[];
} = {
  header: {
    title: '用电管理APP',
    translate: 'header.powerManagementApp',
  },
  summarys: [
    {
      title: '实时监控发电用电情况',
      translate: 'desc.realTimeMonitoringOfPowerGenerationAndConsumption',
    },
  ],
  features: [
    {
      title: '收益测算',
      translate: 'desc.revenueProjection',
      icon: 'store-energy',
    },
    {
      title: '故障告警',
      translate: 'desc.faultsAlarms',
      icon: 'fault-alarms',
    },
    {
      title: '智能电管',
      translate: 'desc.intelligentTube',
      icon: 'secure-electricity',
    },
  ],
};

// 经济耐用
export const highQualityPrice: {
  header: BaseDesc;
  summarys: {
    label: BaseDesc;
    value: BaseDesc;
  }[];
  desc: BaseDesc[];
  features: Required<
    BaseDesc & {
      desc: string;
      time: string;
      unit: string;
    }
  >[];
  desc2: {
    label: BaseDesc;
    value: BaseDesc;
  }[];
} = {
  header: {
    title: '轻便耐用',
    translate: 'header.lightweightAndDurable',
  },
  summarys: [
    {
      label: {
        title: '耐用',
        translate: 'desc.durability',
      },
      value: {
        title: '高达 10000 次充放电循环的电厂级电芯',
        translate: 'desc.factoryGradeBatteriesWithUpToChargeDischargeCycles',
      },
    },
    {
      label: {
        title: '够用',
        translate: 'desc.suffice',
      },
      value: {
        title: '可储存1kWh电能，相当于',
        translate: 'desc.canStore1kWhOfElectricalEnergyEquivalentTo',
      },
    },
  ],
  features: [
    {
      title: '照明',
      translate: 'devices.lightBulb',
      icon: 'light-dengpao',
      desc: '80小时',
      time: '80',
      unit: 'applyScene.hours',
    },
    {
      title: '电视',
      translate: 'devices.television',
      icon: 'light-dianshi',
      desc: '10小时',
      time: '10',
      unit: 'applyScene.hours',
    },
    {
      title: '电风扇',
      translate: 'devices.coolingFan',
      icon: 'light-fengshan',
      desc: '16小时',
      time: '16',
      unit: 'applyScene.hours',
    },

    {
      title: '手机',
      translate: 'devices.cellphone',
      icon: 'light-shouji',
      desc: '89次充电',
      time: '89',
      unit: 'applyScene.charges',
    },
  ],
  desc: [
    {
      title: '1天可充放电2次',
      translate: 'desc.chargedAndDischarged2Timesin1day',
    },
  ],
  desc2: [
    {
      label: {
        title: '光伏充电（200W）',
        translate: 'desc.photovoltaicCharging200W',
      },
      value: {
        title: '3.5~5小时/次',
        translate: 'desc.photovoltaicPerTimes',
      },
    },
    {
      label: {
        title: '交流充电（200W）',
        translate: 'desc.aCcharging200W',
      },
      value: {
        title: '5小时/次',
        translate: 'desc.fiveHoursPerTimes',
      },
    },
  ],
};

interface ProgressInfo {
  percent: number; // 占比
  watt: string; // 功率
}
export interface DeviceWattInfo {
  icon: IconName;
  name: BaseDesc;
  used: ProgressInfo;
  restWatt?: string;
  restPercent?: number;
  showRest?: boolean;
  status?: 'normal' | 'warn';
}
// hero下不同功率负载下im-dianchi
export const devicePowerList: DeviceWattInfo[] = [
  {
    name: {
      title: '功率',
      translate: 'desc.watt',
    },
    icon: 'im-dianchi',
    used: {
      watt: '120w',
      percent: 60,
    },
    restWatt: '80w',
    showRest: true,
  },
  {
    name: {
      title: '灯具',
      translate: 'devices.lightBulb',
    },
    icon: 'dengguang',
    used: {
      watt: '20w',
      percent: 16,
    },
  },
  {
    name: {
      title: '风扇',
      translate: 'devices.coolingFan',
    },
    icon: 'fengshan',
    used: {
      watt: '100w',
      percent: 50,
    },
  },
  {
    name: {
      title: '手机',
      translate: 'devices.cellphone',
    },
    icon: 'shouji',
    used: {
      watt: '25w',
      percent: 12.5,
    },
  },
  {
    name: {
      title: '手机',
      translate: 'devices.cellphone',
    },
    icon: 'shouji',
    used: {
      watt: '25w',
      percent: 12.5,
    },
  },
  {
    name: {
      title: '手机',
      translate: 'devices.cellphone',
    },
    icon: 'shouji',
    used: {
      watt: '25w',
      percent: 12.5,
    },
  },
];

export const specs: {
  title: BaseDesc;
  desc: string[];
}[] = [
  {
    title: {
      title: '电芯参数',
      translate: 'specs.batteryParameters',
    },
    desc: [
      'specs.1kWhLithiumIronPhosphateCells',
      'specs.ChargeDischargeCycles',
    ],
  },
  {
    title: {
      title: '功率',
      translate: 'specs.power',
    },
    desc: [
      'specs.outputPower200W',
      'specs.chargingPower200W',
      'specs.ACOutput',
      'specs.ACInput',
      'specs.photovoltaicCharging',
    ],
  },
  {
    title: {
      title: '尺寸和重量',
      translate: 'specs.dimensionsAndWeight',
    },
    desc: ['specs.lengthXwidthXheight', 'specs.norm', 'specs.weight'],
  },

  {
    title: {
      title: '安装',
      translate: 'specs.setting',
    },
    desc: [
      'specs.heroIndoorPlacement',
      'specs.solarPanelOutdoorGroundBalconyOrRoofPlacement',
    ],
  },
  {
    title: {
      title: '工作环境',
      translate: 'specs.workingEnv',
    },
    desc: ['specs.workingTemp', 'specs.IPlevelIP20'],
  },
  {
    title: {
      title: '认证',
      translate: 'specs.accreditation',
    },
    desc: ['specs.conformsToIEC62368', 'specs.conformsToUN383'],
  },
  {
    title: {
      title: '质保',
      translate: 'specs.warranty',
    },
    desc: ['specs.twoYears'],
  },
];

export interface Specificities {
  title: string;
  decs: string;
  translation: string;
}
export const specificities: {
  specificitiesOne: Specificities;
  specificitiesTwo: Specificities;
} = {
  specificitiesOne: {
    title: '小巧够用',
    decs: 'HeroEE 采用电厂级别的电芯，可满足家庭基础用电需求，在停电时为家庭提供必要电力，支持数晚全屋照明；同时她体型小巧，摆放灵活，移动方便',
    translation: 'specificitiesOne',
  },
  specificitiesTwo: {
    title: '不依赖电网',
    decs: 'HeroEE 可搭配太阳能光伏板，独立充电，也可与电网一起同时充电',
    translation: 'specificitiesTwo',
  },
};

// 企业信息
export const enterpriseInfo = {
  email: globalEmail, // 邮箱
  copyright: 'contact.copyright', // 版权备案
  mobileCopyright: 'contact.mobielCopyRight',
  ICP: 'contact.ICP',
  officialWebsite: 'www.hithium.com',
  officialWebsiteLong: 'https://www.hithium.com/',
};
