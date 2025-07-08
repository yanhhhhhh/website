/**
 * 顶部导航栏
 */
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import PCScene from './templatePc';
import MoScene from './mobile';

const AppIntro = () => {
  const base = useAtomValue(baseConfig);
  return base.device.isMobile ? <MoScene /> : <PCScene />;
};

export default AppIntro;
