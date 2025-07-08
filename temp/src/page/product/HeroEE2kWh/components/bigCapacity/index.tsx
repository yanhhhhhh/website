import { useTranslation } from 'react-i18next';
import './index.less';
import { HeroEE2kWhBigCapacity } from '@/constants/production/HeroEE2kWh';
import { Carousel } from 'antd';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { CarouselArrow, Icon } from '@/components';

export const HeroEE2BigCapacity = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);
  return (
    <div className="HeroEE2BigCapacity">
      <div className="HeroEE2BigCapacity-top">
        <div className="title">{t(HeroEE2kWhBigCapacity.title)}</div>
        <div className="desc">
          {HeroEE2kWhBigCapacity.descriptions.map((item) => {
            return (
              <div className="content-item" key={item}>
                <p>{t(item)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="HeroEE2BigCapacity-carousel-wrapper">
        <div className="HeroEE2BigCapacity-carousel">
          <Carousel
            infinite={true}
            dots={false}
            autoplay={true}
            effect="fade"
            arrows={device.isPc ? true : false}
            nextArrow={<CarouselArrow direction="next" />}
            prevArrow={<CarouselArrow direction="prev" />}
          >
            {HeroEE2kWhBigCapacity.items.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className={`carousel-item ${device.isPc ? 'pc' : 'mobile'}`}
                    style={{
                      backgroundImage: device.isPc
                        ? `url(${item.image})`
                        : `url(${item.mobileImage})`,
                    }}
                  ></div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
