import partsBannerImage from '@/assets/images/parts/banner.png';
import partsMobileBannerImage from '@/assets/images/parts/banner-m.png';
import partsMobileProductionImage01 from '@/assets/images/parts/pvHarness.png';
import partsMobileProductionImage02 from '@/assets/images/parts/powerLine.png';
import applicance01 from '@/assets/images/parts/01.png';
import applicance02 from '@/assets/images/parts/02.png';
import applicance03 from '@/assets/images/parts/03.png';
import applicance04 from '@/assets/images/parts/04.png';
import applicance05 from '@/assets/images/parts/05.png';
import applicance06 from '@/assets/images/parts/06.png';
import applicance07 from '@/assets/images/parts/07.png';
import applicance08 from '@/assets/images/parts/08.png';

export const partsBanner = {
  key: 'banner',
  image: partsBannerImage,
  title: 'partsPage.bannerTitle',
  description: 'partsPage.bannerDesc',
  mobileImage: partsMobileBannerImage,
};

export const partsProductions = [
  {
    title: 'partsPage.partsProductionTitle01',
    image: partsMobileProductionImage01,
    //购买链接
    more: undefined,
  },
  {
    title: 'partsPage.partsProductionTitle02',
    image: partsMobileProductionImage02,
    more: undefined,
  },
];
export const appliancesSeriesStyle = {
  pc: {
    width: '2.9rem',
    height: '4rem',
  },
  mobile: {
    width: '3.45rem',
    height: '5rem',
  },
};
export const appliancesSeries = [
  {
    titleText: '车载 | 家用冰箱45W',
    title: 'partsPage.applianceSeriesTitle01',
    image: applicance01,
    more: undefined,
  },
  {
    titleText: '车载 | 家用冷冻柜30W',
    title: 'partsPage.applianceSeriesTitle02',
    image: applicance02,
    more: undefined,
  },
  {
    titleText: '快充魔方插座30W',
    title: 'partsPage.applianceSeriesTitle03',
    image: applicance03,
    more: undefined,
  },
  {
    titleText: '快速制冷杯36W',
    title: 'partsPage.applianceSeriesTitle04',
    image: applicance04,
    more: undefined,
  },
  {
    titleText: '空调扇60W',
    title: 'partsPage.applianceSeriesTitle05',
    image: applicance05,
    more: undefined,
  },
  {
    titleText: '野营折叠推车60W',
    title: 'partsPage.applianceSeriesTitle06',
    image: applicance06,
    more: undefined,
  },
  {
    titleText: '快充插线板20W',
    title: 'partsPage.applianceSeriesTitle07',
    image: applicance07,
    more: undefined,
  },
  {
    titleText: '16L车载冰箱62W',
    title: 'partsPage.applianceSeriesTitle08',
    image: applicance08,
    more: undefined,
  },
];
