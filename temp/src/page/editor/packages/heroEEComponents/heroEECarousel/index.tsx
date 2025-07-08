import { CarouselArrow } from '@/components';
import { previewScale } from '@/pages/editor/constant';
import { RendererProps } from '@/pages/editor/type';
import { transformSize } from '@/pages/editor/utils';
import { Carousel } from 'antd';
import { cloneDeep, merge } from 'lodash-es';
import { useMemo } from 'react';
import defaultSetter, { CarouselData } from './defaultSetter';

import TextRender from '../../components/textRender';
import { urlEncode } from '@/utils/url';
const Renderer: React.FC<RendererProps> = (props) => {
  const { contentJson, platform, state } = props;

  const scale = useMemo(() => {
    return state == 'edit'
      ? platform == 'pc'
        ? previewScale.pc
        : previewScale.mobile
      : 1;
  }, [platform, state]);
  const config = merge({}, defaultSetter, cloneDeep(contentJson));

  const configStyle = config.componentProps?.style?.[platform];
  const carouselData = config.componentProps?.carouselData as CarouselData[];

  const wrapperStyle = useMemo(() => {
    return {
      width:
        transformSize(
          configStyle?.width / scale,
          state,
          configStyle?.widthUnit
        ) ?? '100px',
      height:
        transformSize(
          configStyle?.height / scale,
          state,
          configStyle?.heightUnit
        ) ?? '100px',
    };
  }, [configStyle, scale, state]);

  return (
    <div
      className="HeroEE-carousel"
      style={{
        ...wrapperStyle,

        position: 'relative',
      }}
    >
      <Carousel
        // infinite={true}
        dots={
          platform == 'pc'
            ? {
                className: 'banner-dots',
              }
            : false
        }
        autoplay={true}
        // effect="fade"
        // arrows={platform == 'pc' ? true : false}
        arrows={true}
        nextArrow={<CarouselArrow direction="next" />}
        prevArrow={<CarouselArrow direction="prev" />}
      >
        {carouselData.length > 0 ? (
          carouselData?.map((item, index) => {
            const textConfigList = item.text;

            return (
              <div key={index}>
                <div
                  className={`carousel-item`}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#364d79',
                    backgroundImage: `${
                      item.image?.[platform]?.fileUrlProxy
                        ? `url(${urlEncode(
                            item.image?.[platform]?.fileUrlProxy
                          )})`
                        : ''
                    }`,
                    position: 'relative',
                    ...wrapperStyle,
                  }}
                >
                  <div>
                    {textConfigList?.map((text) => {
                      return (
                        <TextRender
                          key={text.id}
                          text={text}
                          platform={platform}
                          state={state}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div
              style={{
                ...wrapperStyle,
                background: '#364d79',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
              }}
            >
              <div>暂未配置轮播图</div>
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Renderer;
