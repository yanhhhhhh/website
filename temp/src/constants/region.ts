export interface RegionCountry {
  country: string;
  countryCode: string;
  languageName: string;
  languageCode: string;
  i18n: string;
  locale: string;
  templateGroupId: string;
}
export interface Region {
  region: string;
  regionCode: string;
  regionName: string;
  countries: RegionCountry[];
}

//东亚
export const EastAsia: RegionCountry[] = [
  {
    country: '中国（大陆）',
    countryCode: 'CN',
    languageName: '简体中文',
    languageCode: 'zh',
    i18n: 'zh_CN', //切换语言时使用
    locale: 'zh_CN', //顶部显示的国家和语言
    templateGroupId: '',
  },
];
// 东南亚
export const SoutheastAsia: RegionCountry[] = [
  {
    country: 'Malay (Malaysia)',
    countryCode: 'MY',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US',
    locale: 'en_MY',
    templateGroupId: '',
  },
  {
    country: 'Indonesian',
    countryCode: 'ID',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US',
    locale: 'en_ID',
    templateGroupId: '',
  },
  {
    country: 'Cambodia', //柬埔寨
    countryCode: 'KH',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US', //暂时先用en-US
    locale: 'en_KH',
    templateGroupId: '',
  },
];
export const SoutheastAsiaCountryCode = Array.from(
  new Set([...SoutheastAsia.map((item) => item.locale)])
);

export const Europe = [{}];
//南亚
export const SouthAsia: RegionCountry[] = [
  {
    country: 'Pakistan', //巴基斯坦
    countryCode: 'PK',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US',
    locale: 'en_PK',
    templateGroupId: '',
  },
];

export const southernAsiaCountryCode = Array.from(
  new Set([...SouthAsia.map((item) => item.locale)])
);
//非洲
export const Africa: RegionCountry[] = [
  {
    country: 'Nigeria', //尼日利亚
    countryCode: 'NG',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US',
    locale: 'en_NG', //带国家代码
    templateGroupId: '',
  },
  {
    country: 'Kenya', //肯尼亚
    countryCode: 'KE',
    languageName: 'English',
    languageCode: 'en',
    i18n: 'en_US',
    locale: 'en_KE',
    templateGroupId: '',
  },
  // {
  //   country: 'Lebanon', //黎巴嫩
  //   countryCode: 'LB',
  //   languageName: 'English',
  //   languageCode: 'en',
  //   i18n: 'en_US',
  //   locale: 'en_LB',
  // templateGroupId:''

  // },
];
export const AfricaCountryCode = Array.from(
  new Set([...Africa.map((item) => item.locale)])
);
export const regionCountryMap = {
  EastAsia: {
    region: '东亚',
    regionCode: 'EA',
    regionName: 'EastAsia',
    countries: EastAsia,
  },
  SoutheastAsia: {
    region: '东南亚',
    regionCode: 'SEA',
    regionName: 'SoutheastAsia',
    countries: SoutheastAsia,
  },
  SouthAsia: {
    region: '南亚',
    regionCode: 'SA',
    regionName: 'SouthAsia',
    countries: SouthAsia,
  },

  Africa: {
    region: '非洲',
    regionCode: 'ZA',
    regionName: 'Africa',
    countries: Africa,
  },
};
export const regionCountry = Array.from(Object.values(regionCountryMap));

export const allCountry = Array.from(
  new Set([...EastAsia, ...SoutheastAsia, ...SouthAsia, ...Africa])
);
