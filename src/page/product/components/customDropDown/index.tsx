import { useMemo, useState } from 'react';
import { Dropdown, Space, Flex } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import type { MenuProps } from 'antd';
import Styles from './view.module.less';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';

type ItemProp = ItemType<MenuItemType> & {
  translate: string;
};

interface Props {
  items: ItemProp[];
  defaultKey: string;
  onItemClick?: MenuProps['onClick'];
}

const CustomDropDown = ({
  items = [
    {
      label: '深圳',
      key: 'shenzhen',
      translate: 'city.shenzhen',
    },
  ],
  defaultKey,
  onItemClick,
}: Props) => {
  const [selectedKey, setSelectedKey] = useState<string>(defaultKey);
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);

  const onClick: MenuProps['onClick'] = useMemoizedFn(({ key }) => {
    setSelectedKey(key);
    onItemClick && onItemClick(key);
  });

  //@ts-ignore
  const transItems: MenuProps['items'] = useMemo(() => {
    return items.map((ele) => {
      return {
        label: <span>{t(ele.translate)}</span>,
        key: ele.key,
      };
    });
  }, [items, base.language, t]);

  const currentLabel = useMemo(() => {
    const o = items.find((ele) => ele?.key === selectedKey);
    return o ? t(o.translate) : '';
  }, [selectedKey, items, base.language, t]);

  return (
    <Flex className={Styles.box} align="center">
      <span className={Styles.label}>{`${t('city.city')}${t(
        'sign.colon'
      )}`}</span>
      <Dropdown menu={{ items: transItems, onClick }}>
        <span>
          <Space>
            {currentLabel}
            <DownOutlined />
          </Space>
        </span>
      </Dropdown>
    </Flex>
  );
};

export default CustomDropDown;
