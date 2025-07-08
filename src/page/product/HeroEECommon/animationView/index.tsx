import { useTranslation } from 'react-i18next';
import Styles from './view.module.less';
import { useInViewport } from 'ahooks';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import './index.less';

interface AnimationViewProps {
  title: string;
  desc: string;
  imageFirst: string;
  imageSecond: string;
  children?: React.ReactNode;
}

const AnimationView: FC<AnimationViewProps> = ({
  title,
  desc,
  imageFirst,
  imageSecond,
  children,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInViewport] = useInViewport(ref);
  const timer = useRef<number | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  useLayoutEffect(() => {
    const doms = ref.current?.querySelectorAll(
      '.cover'
    ) as NodeListOf<HTMLDivElement>;
    if (!doms) return;

    function animateTransition() {
      // 切换动画：从图片1到图片2，再从图片2回到图片1
      doms.forEach((dom, i) => {
        if ((isReversed && i === 0) || (!isReversed && i === 1)) {
          dom.style.opacity = '1';
          dom.classList.remove('fadeOut');
          dom.classList.add('fadeIn');
        } else {
          dom.style.opacity = '0';
          dom.classList.remove('fadeIn');
          dom.classList.add('fadeOut');
        }
      });
    }

    if (isInViewport) {
      animateTransition(); // 立即执行动画
      timer.current = window.setInterval(() => {
        setIsReversed((prev) => !prev); // 切换方向
      }, 6000);
    } else {
      timer.current && clearInterval(timer.current);
    }

    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [isInViewport, isReversed]);

  return (
    <div className={`${Styles.scene} animationView`} ref={ref}>
      <div className={`${Styles.header} `}>
        <div className={Styles.title}>{t(title)}</div>
        <div className={Styles.desc}>{t(desc)}</div>
      </div>
      <div className={Styles.temple}></div>
      <img
        className={`${Styles.cover} cover`}
        style={{ opacity: 1 }}
        src={imageFirst}
      />
      <img className={`${Styles.cover} cover`} src={imageSecond} />
      {children}
    </div>
  );
};

export default AnimationView;
