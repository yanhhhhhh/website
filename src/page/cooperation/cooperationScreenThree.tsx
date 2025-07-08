import { cooperationScreenThree } from './constant';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import './cooperationScreenThree.less';
const CooperationScreenThree = () => {
  const { device } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return (
    <div className="cooperation-screen-three">
      <div
        className="cooperation-screen-three-item"
        style={{
          backgroundImage: device.isPc
            ? `url(${cooperationScreenThree.image.pc})`
            : `url(${cooperationScreenThree.image.mobile})`,
        }}
      >
        <div className="title">{t(cooperationScreenThree.title)}</div>
        <div className="desc">{t(cooperationScreenThree.description)}</div>
      </div>
    </div>
  );
};

export default CooperationScreenThree;
