import { Carousel } from 'antd';
import { CarouselProps, CarouselRef } from 'antd/es/carousel';
import Styles from './view.module.less';
import { Icon } from '@/components';
import { useRef, useState } from 'react';
interface MyCarouselProps extends CarouselProps {
  children?: React.ReactNode[];
}
/// 轮播图组件
const MyCarousel = (props: MyCarouselProps) => {
  const { children = [], ...rest } = props;

  const ref1 = useRef<CarouselRef>(null);
  const [index, setIndex] = useState(0);

  const changeIndex = (index: number) => {
    setIndex(index);
  };
  const pre = () => {
    let temp;
    if (index > 0) {
      temp = index - 1;
    } else {
      temp = children.length - 1;
    }
    setIndex(temp);
    ref1.current?.goTo(temp);
  };
  const next = () => {
    let temp;
    if (index < children.length - 1) {
      temp = index + 1;
    } else {
      temp = 0;
    }
    setIndex(temp);
    ref1.current?.goTo(temp);
  };
  return (
    <div className={Styles.carousel}>
      <Carousel afterChange={changeIndex} ref={ref1} {...rest}>
        {children.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Carousel>
      <div className={`${Styles.pre} ${Styles.btn}`}>
        <Icon
          name="icon_banner_pre"
          onClick={pre}
          style={{
            width: '0.8rem',
            height: '0.8rem',
            color: '#fff',
          }}
        ></Icon>
      </div>
      <div className={`${Styles.next} ${Styles.btn}`}>
        <Icon
          name="icon_banner_next"
          onClick={next}
          style={{
            width: '0.8rem',
            height: '0.8rem',
            color: '#fff',
          }}
        ></Icon>
      </div>
    </div>
  );
};

export default MyCarousel;
