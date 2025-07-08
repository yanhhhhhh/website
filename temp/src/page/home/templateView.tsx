import TemplateRender from '@/components/templateRender';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { HomeSecondView } from './components/secondView';

const Home = () => {
  const { device } = useAtomValue(baseConfig);

  const p2 = <HomeSecondView key="HomeSecondView" />;

  return (
    <TemplateRender
      labelName="首页面"
      filledComponent={{
        '2': p2,
      }}
    />
  );
};

export default Home;
