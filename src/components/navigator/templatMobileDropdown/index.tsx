import { Flex } from 'antd';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useClickAway, useMemoizedFn } from 'ahooks';

import { useLocale } from '@/hooks';
import { isShowMobileNav } from '@/stores';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

import { Icon } from '@/components/icons';
import { useTemplateMenu } from '@/hooks/template/useTemplateMenu';
import { useTemplatNav } from '@/hooks/template/useTemplatNav';
import './index.less';
import { getName } from '@/utils/page';

export const TemplateMobileDropdown = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { navigate, getI18nBackEndKey } = useLocale();

  const [isOpen, setIsOpen] = useAtom(isShowMobileNav);
  const location = useLocation();
  const { bottomMenu } = useTemplateMenu();
  const { goTo } = useTemplatNav();

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

    goTo(item);
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
            {(bottomMenu ?? []).map((item, index) => {
              return (
                <div key={index} className="dropdown-list-item">
                  <h1
                    className={`${item.labelType == 'menu' ? 'title' : ''}`}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {getName(item.i18nLabelNameJson, getI18nBackEndKey)}
                  </h1>
                  <div>
                    {item.children.map((child, i) => {
                      return (
                        <h1
                          key={i}
                          className={`child `}
                          onClick={() => handleMenuItemClick(child)}
                        >
                          {getName(child.i18nLabelNameJson, getI18nBackEndKey)}
                        </h1>
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

export default memo(TemplateMobileDropdown);
