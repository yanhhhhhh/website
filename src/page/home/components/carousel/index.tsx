import { Carousel } from 'antd';

import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import './index.less';
import { Card, CardProps, CarouselArrow } from '@/components';

interface MyCarouselProps {
  list: CardProps[];
}
/// 轮播图组件
const MyCarousel = ({ list }: MyCarouselProps) => {
  const { device } = useAtomValue(baseConfig);
  return (
    <div className="my-carousel">
      <Carousel
        infinite={true}
        dots={
          device.isPc
            ? {
                className: 'banner-dots',
              }
            : false
        }
        autoplay={true}
        effect="fade"
        arrows={device.isPc ? true : false}
        nextArrow={<CarouselArrow direction="next" />}
        prevArrow={<CarouselArrow direction="prev" />}
      >
        {list.map((item, index) => {
          return (
            <div key={index}>
              <div className={`carousel-item `}>
                <Card {...item}></Card>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
