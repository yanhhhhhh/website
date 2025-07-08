import contactUsBannerImage from '../assets/images/contactUs/banner.png';
import contactUsMobileBannerImage from '../assets/images/contactUs/mobileBanner.png';
import chinaMap from '@/assets/images/contactUs/map/china.png';
import kenniyaMap from '@/assets/images/contactUs/map/kenniya.png';
import niriliyaMap from '@/assets/images/contactUs/map/niriliya.png';
import dongnanyaMap from '@/assets/images/contactUs/map/dongnanya.png';
import aftersalesQRCode from '@/assets/images/support/QR-code.webp';
import businessQRCode from '@/assets/images/cooperation/QR-code.webp';

export const contactUsBanner = {
  title: '联系我们',

  description:
    '请留下您的联系方式\n我们的专业可持续能源解决团队将第一时间联系您！',

  image: contactUsBannerImage,
  mobileImage: contactUsMobileBannerImage,
  translation: {
    title: 'contactPage.contactUs',
    description: 'contactPage.leaveYourContact',
  },
};
//没有name 使用country+服务中心
export const contactUsCountry = [
  {
    uuid: 'china',
    country: '中国',
    countryTranslate: 'country.china',
    name: '中国服务中心',
    nameTranslate: 'country.chinaServiceCenter',
    phone: '+86 19328754390',
    email: 'SDG7@hithium.com',
    address: 'country.chinaAddress',
    map: chinaMap,
    countryCode: 'CN',
  },
  {
    uuid: 'kenniya',
    country: '肯尼亚',
    countryTranslate: 'country.kenniya',
    name: '肯尼亚',
    nameTranslate: 'country.kenniyaServiceCenter',
    phone: '+27 717375866',
    email: 'viki.zhang@hithium.com',
    address: '', //country.kenniyaAddress
    map: kenniyaMap,
    countryCode: 'KE',
  },

  {
    uuid: 'niriliya',
    country: '尼日利亚',
    countryTranslate: 'country.niriliya',
    name: '尼日利亚',
    nameTranslate: 'country.niriliyaServiceCenter',
    phone: '+2348123367893',
    email: 'Peter.zhao@hithium.com',
    address: 'country.niriliyaAddress',
    map: niriliyaMap,
    countryCode: 'NG',
  },

  {
    uuid: 'bajisitan',
    country: '巴基斯坦',
    countryTranslate: 'country.bajisitan',
    name: '巴基斯坦服务中心',
    nameTranslate: 'country.bajisitanServiceCenter',
    phone: '+855 0768986979\n15021603990',
    email: 'shentulj@hithium.cn',
    address: '', //country.bajisitanAddress
    map: dongnanyaMap, // todo dai
    countryCode: 'PK',
  },
  {
    uuid: 'yinni',
    country: '印尼',
    countryTranslate: 'country.yinni',
    name: '东南亚服务中心',
    nameTranslate: 'country.yinniServiceCenter',
    phone: '+855 0768986979\n15021603990',
    email: 'shentulj@hithium.cn',
    address: '', //country.yinniAddress
    map: dongnanyaMap,
    countryCode: 'ID',
  },
  {
    uuid: 'malaixiya',
    country: '马来西亚',
    countryTranslate: 'country.malaixiya',
    nameTranslate: 'country.malaixiyaServiceCenter',
    name: 'country.malaixiyaServiceCenter',
    phone: '+855 0768986979\n15021603990',
    email: 'shentulj@hithium.cn',
    address: '', //country.malaixiyaAddress
    map: dongnanyaMap,
    countryCode: 'MY',
  },
  {
    uuid: 'jianpuzhai',
    country: '柬埔寨',
    countryTranslate: 'country.jianpuzhai',
    name: '东南亚服务中心',
    nameTranslate: 'country.jianpuzhaiServiceCenter',
    phone: '+855 0768986979\n15021603990',
    email: 'shentulj@hithium.cn',
    address: 'country.jianpuzhaiAddress',
    map: dongnanyaMap,
    countryCode: 'KH',
  },
  // {
  //   uuid: 'libanen',
  //   country: '黎巴嫩',
  //   countryTranslate: '黎巴嫩',
  //   name: '黎巴嫩服务中心',
  //   nameTranslate: '黎巴嫩服务中心',
  //   phone: '+2348123367893',
  //   email: 'leon.gao@hithium.com',
  //   address: '',
  //   map: import('@/assets/images/contactUs/map/libanen.png'),
  // },
];
export const consultType = [
  {
    type: 'SERVICE',
    name: '服务支持',
    translation: 'consultType.serviceSupport',
  },
  {
    type: 'BUY_QUERY',
    name: '产品咨询/购买咨询',
    translation: 'consultType.productConsultation',
  },
  {
    type: 'BUY(SHOP)',
    name: '批量购买(零售商或分销商)',
    translation: 'consultType.bulkPurchaseForRetailersOrDistributors',
  },
  {
    type: 'BUY(PERSON)',
    name: '批量购买(供个人使用)',
    translation: 'consultType.bulkPurchaseForPersonalUse',
  },
];

export const contactUsList = [
  {
    name: 'footer.business',
    email: 'SDG7@hithium.com',
    img: businessQRCode,
  },
  {
    name: 'footer.aftermarket',
    email: 'aftersales@hithium.com',
    img: aftersalesQRCode,
  },
];
