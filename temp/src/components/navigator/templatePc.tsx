import Logo from '@/assets/images/logow.svg';
import { baseConfig } from '@/stores';
import { getDeviceClassname, isTablet } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import { Flex } from 'antd';
import { useAtomValue } from 'jotai';

import LanguageSwitch from '../languageSwitch';
import Style from './view.module.less';

import { useLocale } from '@/hooks';

import { useTemplateMenu } from '@/hooks/template/useTemplateMenu';
import HeroTemplatDropdown from './heroTemplateDropdown';
import { useTemplatNav } from '@/hooks/template/useTemplatNav';

import { getName } from '@/utils/page';
import { useEffect, useState } from 'react';

const PcNav = () => {
  const { navigateTo, getI18nBackEndKey } = useLocale();
  const [isTabletValue, setIsTabletValue] = useState(true);
  const base = useAtomValue(baseConfig);
  const goHome = useMemoizedFn(() => {
    navigateTo('/');
  });

  const { isActived, goTo } = useTemplatNav();
  const { topMenu } = useTemplateMenu();
  function changeTabletFlag() {
    const isTableTemp = isTablet();

    setIsTabletValue(isTableTemp);
  }
  useEffect(() => {
    window.addEventListener('load', () => {
      // PC 端触发，ios ipad 不触发，默认isTabletValue = true ，hover 在ipad 上dropdown 会有问题
      changeTabletFlag();
    });

    window.addEventListener('orientationchange', changeTabletFlag);

    return () => {
      window.removeEventListener('load', changeTabletFlag);
      window.removeEventListener('orientationchange', changeTabletFlag);
    };
  }, []);
  return (
    <header className={Style.header} id="hero-nav">
      <Flex className={Style.nav} align="center" justify="space-between">
        <Flex align="center" justify="flex-start">
          {/* 点击返回首页 */}
          <img
            className={`${getDeviceClassname(base.device)} ${Style.logo}`}
            onClick={goHome}
            src={Logo}
            alt="HIHIUM"
          />
          <div className={`${Style.navList} `}>
            {topMenu.map((item) => {
              if (item.childLabelDTOList && item.childLabelDTOList.length > 0) {
                return (
                  <div key={item.id} className={`${Style.navListItem}`}>
                    <HeroTemplatDropdown
                      data={item}
                      isTabletValue={isTabletValue}
                    />
                  </div>
                );
              }

              return (
                <h1
                  className={`${Style.navItem} 
                  ${isActived(item) ? Style['navItem-active'] : ''}  
                  `}
                  key={item.id}
                  onClick={() => goTo(item)}
                >
                  {getName(item.i18nLabelNameJson, getI18nBackEndKey)}
                </h1>
              );
            })}
          </div>
        </Flex>

        <LanguageSwitch />
      </Flex>
    </header>
  );
};

export default PcNav;
