import Logo from '@/assets/images/logow.svg';
import { baseConfig } from '@/stores';
import { getDeviceClassname } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import { Flex } from 'antd';
import { useAtomValue } from 'jotai';
import { memo, useMemo } from 'react';
import LanguageSwitch from '../languageSwitch';
import Style from './view.module.less';

import { useLocale } from '@/hooks';

import { useCustomization } from '@/hooks/useCustomization';
import { useTranslation } from 'react-i18next';

import { useNav } from './useNav';
import HeroDropdown from './dropdown';
import { aboutUsNav, powerSupply } from '@/constants';

const PcNav = () => {
  const { navigateTo, updatePathsToRoot } = useLocale();
  const { navigatorRouter, customServiceNav } = useCustomization();
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  const goHome = useMemoizedFn(() => {
    navigateTo('/');
  });

  const pcNavList = useMemo(() => {
    const updatedRouters = [...navigatorRouter].map((r) =>
      updatePathsToRoot(r)
    );
    return [...updatedRouters, customServiceNav];
  }, [customServiceNav, navigatorRouter, updatePathsToRoot]);

  const { isActived, goTo } = useNav();
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
          <div className={Style.navList}>
            {pcNavList.map((item) => {
              if (item.name == 'navigator.aboutUs') {
                return (
                  <div
                    key={item.name}
                    className={`${Style.navItem} ${
                      isActived(item) ? Style['navItem-active'] : ''
                    }  `}
                  >
                    <HeroDropdown data={aboutUsNav} />
                  </div>
                );
              }
              if (item.name == 'navigator.service') {
                return (
                  <div
                    key={item.name}
                    className={`${Style.navItem} ${
                      isActived(item) ? Style['navItem-active'] : ''
                    }  `}
                  >
                    <HeroDropdown data={customServiceNav} />
                  </div>
                );
              }
              if (item.name == 'navigator.production') {
                return (
                  <div
                    key={item.name}
                    className={`${Style.navItem} ${
                      isActived(item) ? Style['navItem-active'] : ''
                    }  `}
                  >
                    <HeroDropdown data={powerSupply} />
                  </div>
                );
              }
              return (
                <div
                  className={`${Style.navItem} ${
                    isActived(item) ? Style['navItem-active'] : ''
                  }  `}
                  key={item.name}
                  onClick={() => goTo(item)}
                >
                  {`${t(item.name)}`}
                </div>
              );
            })}
          </div>
        </Flex>

        <LanguageSwitch />
      </Flex>
    </header>
  );
};

export default memo(PcNav);
