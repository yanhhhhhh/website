import './dropdown.less';

import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import { IMenuItem, useTemplatNav } from '@/hooks/template/useTemplatNav';

import type { MenuProps } from 'antd';
import { useState } from 'react';

export interface HeroDropdownProps {
  data: IMenuItem;
  isTabletValue?: boolean;
}
const HeroTemplatDropdown = (props: HeroDropdownProps) => {
  const { t } = useTranslation();
  const { data, isTabletValue = true } = props;
  const { isActived, goTo } = useTemplatNav();
  const [open, setOpen] = useState(false);
  const items: MenuProps['items'] = data.children.map((child) => ({
    key: child.name,
    label: (
      <div
        key={child.name}
        className={`nav-dropdown-item image-item  ${
          isActived(child) ? 'active' : ''
        }`}
      >
        {child.image ? (
          <div>
            <img
              style={{
                width: '1.4rem',
                height: '2rem',
              }}
              src={child.image}
              alt=""
            />
            <h3>{t(child.name)}</h3>
          </div>
        ) : (
          <>{t(child.name)}</>
        )}
      </div>
    ),

    onClick: () => {
      goTo(child);
    },
  }));

  return (
    <Dropdown
      menu={{ items }}
      arrow={false}
      overlayClassName="nav-dropdown"
      placement="bottom"
      // fix:使用['hover'，'click']会导致平板设备点击关闭dropdown后，再次点击无法打开
      // fix:使用['click']会导致pc设备无法hover
      trigger={isTabletValue ? ['click'] : ['hover']}
    >
      <div className={`nav-title ${isActived(data) ? 'active' : ''}`}>
        {t(data.name)}
      </div>
    </Dropdown>
  );
};

export default HeroTemplatDropdown;
