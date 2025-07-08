import Logo from '@/assets/images/logow.svg';
import { baseConfig } from '@/stores';
import { getDeviceClassname } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import { Flex, Space } from 'antd';
import { useAtomValue } from 'jotai';
import { memo, useCallback } from 'react';
import LanguageSwitch from '../languageSwitch';
import Style from './view.module.less';

import { useLocale } from '@/hooks';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TemplateMobileDropdown } from './templatMobileDropdown';

const MoNav = () => {
  const location = useLocation();

  const base = useAtomValue(baseConfig);
  const { t } = useTranslation();

  const { navigateTo } = useLocale();

  const goHome = useMemoizedFn(() => {
    navigateTo('/');
  });

  const onBackClick = useCallback(() => {
    navigateTo(`/aboutUs/news`);
  }, []);

  return (
    <header className={Style.header} id="hero-nav">
      <Flex className={Style.nav} align="center" justify="space-between">
        {!location.pathname.includes('detail') ? (
          // <img
          //   className={`${getDeviceClassname(base.device)} ${Style.logo}`}
          //   onClick={goHome}
          //   src={Logo}
          //   alt="HIHIUM"
          // />
          <>logo</>
        ) : (
          <Space className={Style['top-bar']} onClick={onBackClick}>
            <LeftOutlined />
            <span>{t('case.back')}</span>
          </Space>
        )}

        <Flex align="center" className={Style.navList}>
          <LanguageSwitch />
          {/* <MobileDropdown /> */}
          <TemplateMobileDropdown />
        </Flex>
      </Flex>
    </header>
  );
};

export default memo(MoNav);
