import './dropdown.less';

import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';

import { useNav } from './useNav';
import { useLocale } from '@/hooks';
export interface HeroDropdownProps {
  data: {
    name: string;
    to: string;
    path: string;
    children: {
      name: string;
      to: string;
      label: string;
      path: string;
      type: string;
      image?: string;
    }[];
  };
}
const HeroDropdown = (props: HeroDropdownProps) => {
  const { t } = useTranslation();
  const { data } = props;
  const { isActived, goTo } = useNav();
  const { getPath } = useLocale();

  const items = data.children.map((child) => ({
    key: child.name,
    label: (
      <>
        {child.type === 'anchor' ? (
          <a
            className={`nav-dropdown-item ${isActived(child) ? 'active' : ''}`}
            href={`${import.meta.env.VITE_ROUTER_BASE}${getPath(child.to)}`}
            key={child.name}
          >
            {t(child.name)}
          </a>
        ) : (
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
        )}
      </>
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
    >
      <div
        className={`nav-title ${isActived(data) ? 'active' : ''}`}
        onClick={(e) => e.preventDefault()}
      >
        {t(data.name)}
      </div>
    </Dropdown>
  );
};

export default HeroDropdown;
