import Styles from './view.module.less';
import { aboutUsBanner } from '@/constants';
import Banner from './components/banner';
import Certification from './components/certification';
import Solution from './components/solution';
const AboutUs = () => {
  return (
    <div className={Styles.aboutUs}>
      {aboutUsBanner.map((item) => {
        return <Banner {...item} key={item.title}></Banner>;
      })}
      <Certification />
      <Solution />
    </div>
  );
};

export default AboutUs;
