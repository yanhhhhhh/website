import Styles from "./view.module.less";
import IconOurVision from "@/assets/images/icon_our_vision.png";

const OurVision = () => {
  return (
    <div className={Styles.ourVision}>
      <img className={Styles.bgImg} src={IconOurVision} alt="" />
      <div className={Styles.content}>
        <h2 className={Styles.title}>我们的愿景</h2>
        <p className={Styles.desc}>HeroEE能源平权解决方案</p>
        <p className={Styles.target}>
          提供可负担，可靠，可持续的产品是我们最核心的目标
        </p>
      </div>
    </div>
  );
};

export default OurVision;
