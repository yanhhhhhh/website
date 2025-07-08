import { Flex } from 'antd';
import Styles from './view.module.less'

interface Props {
  style?: React.CSSProperties | undefined
}

const LandscapeMode = ({
  style = {}
}: Props) => {
  return (<Flex className={Styles.scene} style={style} align='center' justify='center'>
    <p>为了您的良好体验，请将手机/平板竖屏操作</p>
  </Flex>)
}

export default LandscapeMode;
