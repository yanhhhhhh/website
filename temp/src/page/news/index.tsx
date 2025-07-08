import { NewsBanner } from './components/banner';
import Case from './components/case';
import './index.less';
const News = () => {
  return (
    <div className="news">
      <NewsBanner />

      <Case />
    </div>
  );
};

export default News;
