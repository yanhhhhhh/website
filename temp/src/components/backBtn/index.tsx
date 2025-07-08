import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Styles from './view.module.less';

export interface Props {
  backPath?: string;
  style?: React.CSSProperties;
}

const BackBtn = ({ backPath, style = {} }: Props) => {
  const navigate = useNavigate();

  const onBtnClick = () => {
    if (!backPath) {
      navigate(-1);
    } else {
      navigate(backPath);
    }
  };

  return (
    <Flex
      className={`backBtn ${Styles.backBtn}`}
      onClick={onBtnClick}
      style={{ ...style }}
      align="center"
      justify="center"
    >
      <LeftOutlined className={Styles.icon} />
    </Flex>
  );
};

export default BackBtn;
