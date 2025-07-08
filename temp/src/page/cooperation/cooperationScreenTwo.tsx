import { cooperationScreenTwo } from './constant';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import './cooperationScreenTwo.less';
const CooperationScreenTwo = () => {
  const { device } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return (
    <div className="cooperation-screen-two">
      {cooperationScreenTwo.map((item) => {
        return (
          <div
            key={item.title}
            className="cooperation-screen-two-item"
            style={{
              backgroundImage: device.isPc
                ? `url(${item.image.pc})`
                : `url(${item.image.mobile})`,
            }}
          >
            <h2 className="title">{t(item.title)}</h2>
            <div className="desc-list">
              {item.descriptionList.map((desc) => {
                return (
                  <p className="desc" key={desc}>
                    {t(desc)}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CooperationScreenTwo;
