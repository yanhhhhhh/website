import firstBannerImage from '@/assets/images/aboutUs/firstBanner.png';
import firstBannerMobileImage from '@/assets/images/aboutUs/firstBannerMobile.png';
import secondBannerImage from '@/assets/images/aboutUs/secondBanner.png';
import secondBannerMobileImage from '@/assets/images/aboutUs/secondBannerMobile.png';
import certificationImage1 from '@/assets/images/aboutUs/certification1.png';
import certificationImage2 from '@/assets/images/aboutUs/certification2.png';
import certificationBg from '@/assets/images/aboutUs/certificationBg.png';
import certificationBgMobile from '@/assets/images/aboutUs/certificationBgMobile.png';
import certification from '@/assets/images/aboutUs/certification.png';
import solutionImage from '@/assets/images/allProduction.png';
import solutionEnImage from '@/assets/images/en/allProduction.png';

export const aboutUsBanner = [
  {
    title: '能源平权背景及现状',
    titleKey: 'aboutUsPage.firstBannerTitle',
    image: firstBannerImage,
    mobileImage: firstBannerMobileImage,
    description: [
      {
        text: '不少地区都面临电力短缺情况，影响着生活和生产',
        key: 'aboutUsPage.firstBannerDesc1',
      },
      {
        text: '影响着生活和生产',
        key: 'aboutUsPage.firstBannerDesc2',
      },
      // {
      //   text: '给孩子更好的童年，给家庭更美好生活',
      //   key: 'aboutUsPage.betterChildhoodForChildrenBetterLifeForFamilies',
      // },
    ],
  },
  {
    title: 'HeroEE 愿景与使命目标',
    titleKey: 'aboutUsPage.secondBannerTitle',
    image: secondBannerImage,
    mobileImage: secondBannerMobileImage,
    description: [
      {
        text: '帮助能源贫困地区居民也能享受到可负担',
        key: 'aboutUsPage.secondBannerDesc1',
      },
      {
        text: '可靠的电力',
        key: 'aboutUsPage.secondBannerDesc2',
      },
    ],
  },
];
//认证及荣誉
export const aboutUsCertification = {
  title: '认证及荣誉',
  titleKey: 'aboutUsPage.certificationAndHonor',
  description: '接轨联合国可持续发展目标',
  descriptionKey:
    'aboutUsPage.alignWithUnitedNationsSustainableDevelopmentGoals',
  image: certification,
  bgImage: certificationBg,
  bgMobileImage: certificationBgMobile,
  certification: [
    {
      title: '联合国契约组织成员',
      titleKey: 'aboutUsPage.memberOfUnitedNationsCompactOrganization',
      key: 'certificationImage1',
      image: certificationImage1,
      description: ['United Nations', 'Global Compact'],
    },
    {
      title: '厦门工厂碳中和认证',
      key: 'certificationImage2',

      titleKey: 'aboutUsPage.xiamenFactoryCarbonNeutralCertification',
      image: certificationImage2,
    },
  ],
};
export const certificationImageText = [
  {
    title: '生态',
    titleKey: 'aboutUsPage.ecology',
  },
  {
    title: '生产',
    titleKey: 'aboutUsPage.production',
  },
  {
    title: '生活',
    titleKey: 'aboutUsPage.life',
  },
];
//能源平权解决方案
export const aboutUsSolution = {
  title: '能源平权解决方案',
  titleKey: 'aboutUsPage.energyEquitySolution',
  items: [
    {
      title: 'HeroEE 1kWh',
      titleKey: 'aboutUsPage.heroEE1KWh',
      image: {
        zh: solutionImage,
        en: solutionEnImage,
      },

      herf: '/product_intro/1kwh',
      description: [
        {
          text: '全球首款能源平权产品HeroEE内置1千瓦时（1度电）的能量，通过“白天充、晚上用”的模式，解决了能源贫困家庭的基本用电问题，产品还可以通过手机APP实时连接，可以查看电池状态、远程开关机。',
          key: 'aboutUsPage.solutionDesc',
        },
      ],
      extraTitle: 'HeroEE 1度电解决方案',
      extraTitleKey: 'aboutUsPage.heroEEOneDegreeElectricitySolution',

      extraDescription: [
        {
          text: '在柬埔寨，人们运用HeroEE储能系统助力商业行为，并获得持续收益',
          key: 'aboutUsPage.inCambodiaPeopleUseHeroEEEnergyStorageSystemsToSupportBusinessActivitiesAndGetSustainableReturns',
        },
      ],
    },
  ],
};
