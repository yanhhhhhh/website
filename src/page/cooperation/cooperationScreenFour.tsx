import { cooperationScreenFour } from './constant';
import { useTranslation } from 'react-i18next';
import './cooperationScreenFour.less';
const CooperationScreenFour = () => {
  const { t } = useTranslation();
  return (
    <div className="cooperation-screen-four">
      <div className="cooperation-screen-four-title">
        {t(cooperationScreenFour.title)}
      </div>
      <div className="cooperation-screen-four-list">
        {cooperationScreenFour.list.map((item) => {
          return (
            <div key={item.title} className="item">
              <img src={item.image} alt="image" />
              <div className="title">{t(item.title)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CooperationScreenFour;
