import { Carousel } from 'antd';

import './moreSceneCarousel.less';

interface Props {
  images: string[];
}
export default function MoreSceneCarousel({ images }: Props) {
  return (
    <div className="more-scene-carousel">
      <Carousel
        dots={false}
        autoplay={true}
        infinite={true}
        autoplaySpeed={3000}
        cssEase="linear"
        slidesToShow={3}
        slidesToScroll={1}
        pauseOnHover={false}
        centerMode={true}
      >
        {images.slice(0, 4).map((item) => {
          return (
            <div key={item}>
              <div className="carousel-item">
                <img src={item} alt="img" />
              </div>
            </div>
          );
        })}
      </Carousel>
      <Carousel
        dots={false}
        autoplay={true}
        infinite={true}
        autoplaySpeed={3000}
        cssEase="linear"
        slidesToShow={3}
        slidesToScroll={1}
        pauseOnHover={false}
        centerMode={true}
        rtl={true}
      >
        {images.slice(4).map((item) => {
          return (
            <div key={item}>
              <div className="carousel-item">
                <img src={item} alt="img" />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
