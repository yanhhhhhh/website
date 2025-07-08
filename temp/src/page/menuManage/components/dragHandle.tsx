import { Button } from 'antd';
import { useContext } from 'react';
import { RowContext } from './tableRow';
import { HolderOutlined } from '@ant-design/icons';

export const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};
