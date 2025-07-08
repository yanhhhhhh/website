import { homeNav, mobileNavList } from '@/constants';
import { Flex } from 'antd';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useClickAway, useMemoizedFn } from 'ahooks';

import { useLocale } from '@/hooks';
import { isShowMobileNav } from '@/stores';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { Icon } from '..';
import './index.less';
import { useAgreement } from '@/hooks/useAgreement';
import { useCustomization } from '@/hooks/useCustomization';
const navList = [homeNav, ...mobileNavList];
const MobileDropdown = () => {
  const { customMobileNavList } = useCustomization();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { navigateTo, navigate, getPath } = useLocale();
  const { goToAgreementPage } = useAgreement();
  const [isOpen, setIsOpen] = useAtom(isShowMobileNav);
  const location = useLocation();
  useClickAway(() => {
    setIsOpen(false);
  }, ref);
  const toggleMenu = useMemoizedFn(() => {
    if (window.location.hash) {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
    if (location.pathname.includes('region')) {
      navigate(-1);
    }
    setIsOpen(!isOpen);
  });

  const handleMenuItemClick = useMemoizedFn((item: any) => {
    // 处理菜单项点击事件

    setIsOpen(false); // 关闭菜单

    if (item.to != null && item.to != '') {
      // 跳转到指定页面
      if (item.to.includes('agreement')) {
        goToAgreementPage(item.to);
        return;
      }
      navigateTo(item.to);
    }
  });

  return (
    <div className="dropdown" ref={ref}>
      <Flex align="center">
        {isOpen ? (
          <Icon
            name="nav-more"
            className="dropdown-icon"
            onClick={toggleMenu}
          ></Icon>
        ) : (
          <Icon
            name="nav-close"
            className="dropdown-icon"
            onClick={toggleMenu}
          ></Icon>
        )}
      </Flex>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-list">
            {customMobileNavList.map((item, index) => {
              return (
                <div key={index} className="dropdown-list-item">
                  <div className="title">{`${t(item.name)}`}</div>
                  <div>
                    {item.children.map((child, i) => {
                      return child.type === 'anchor' ? (
                        <a
                          key={i}
                          className={`child ${
                            child.to == '' ? 'disabled' : ''
                          }`}
                          href={`${import.meta.env.VITE_ROUTER_BASE}${getPath(
                            child.to
                          )}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {`${t(child.name)}`}
                        </a>
                      ) : (
                        <div
                          key={i}
                          className={`child ${
                            child.to == '' ? 'disabled' : ''
                          }`}
                          onClick={() => handleMenuItemClick(child)}
                        >
                          {`${t(child.name)}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MobileDropdown);
