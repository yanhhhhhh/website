import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { getDeviceClassname } from '@/utils';
import Style from "./view.module.less";

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  desc?: string;
}

const SceneHeader = ({
  title,
  desc,
  className
}: Props) => {

  const base = useAtomValue(baseConfig);

  return <header className={`${getDeviceClassname(base.device)} ${Style.sceneHeader} ${className}`}>
    <h1>{title}</h1>
    {
      desc ? <h3>{desc}</h3> : null
    }
  </header>
};

export default SceneHeader;
