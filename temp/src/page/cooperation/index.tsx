import CooperrationBanner from './banner';
import CooperationScreenTwo from './cooperationScreenTwo';
import CooperationScreenThree from './cooperationScreenThree';
import CooperationScreenFour from './cooperationScreenFour';
import Partner from './partner';

export const Cooperration = () => {
  return (
    <div>
      {/* banner */}
      <CooperrationBanner />
      {/* 第二屏 */}
      <CooperationScreenTwo />
      {/* 第三屏 */}
      <CooperationScreenThree />
      {/* 行业机遇 */}
      <CooperationScreenFour />
      {/* 成为合作伙伴 */}
      <Partner />
    </div>
  );
};

export default Cooperration;
