import { Flex } from 'antd';
import { BackBtn } from '@/components';
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type Props as BackBtnProps } from '@/components/backBtn';
import { useAtomValue, useSetAtom } from 'jotai';
import { baseConfig } from '@/stores';
import Styles from './view.module.less'

interface Props extends Partial<BackBtnProps> {
  back?: boolean;
  title: string
}

const SceneHeaderWithBack = ({
  back = false,
  title,
  backPath,
  style
} :Props) => {


  const base = useAtomValue(baseConfig);
  const { t, i18n  } = useTranslation();
  const navigate = useNavigate();


  return (<Flex className={Styles.sceneTitle} justify={back ? 'center' : 'unset'}>
    {
      back ? (<BackBtn backPath={backPath} style={{
        position: 'absolute',
        left: 'calc(16 / 414 * 100%)',
        top: 0,
        ...style
      }}  />) : null
    }
    <h1>{t(title)}</h1>
  </Flex>)


  
}

export default SceneHeaderWithBack;
