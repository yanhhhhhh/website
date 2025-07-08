import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import PCScene from './pc';
import MoScene from './mobile';

const ServiceCenter = () => {
  const base = useAtomValue(baseConfig);

  return base.device.isMobile ? <MoScene /> : <PCScene />;
};

export default ServiceCenter;