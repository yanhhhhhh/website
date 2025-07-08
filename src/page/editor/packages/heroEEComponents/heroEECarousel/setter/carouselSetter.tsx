import { TFile } from '@/api/file';
import { I18nObject } from '@/api/i18n';
import { useTool } from '@/pages/editor/hooks/useTool';
import { TPlatform } from '@/pages/editor/type';
import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Divider, Button } from 'antd';
import { cloneDeep } from 'lodash-es';
import { FC } from 'react';
import { ImageUpload, TextConfig } from '../../../heroEEBaseSetters';
import { TText, TTextConfig } from '../../heroEEImage/defaultSetter';
import { CarouselData } from '../defaultSetter';

interface CarouselSetterProps {
  imageSize: {
    width: number;
    height: number;
  };
  platform: TPlatform;
  carouselData: CarouselData[];
  onAddCarousel: () => void;
  onRemoveCarousel: (id: string) => void;
  onImageChange: (carouselId: string, value?: TFile) => void;
  onDeleteTextConfig: (carouselId: string, textId: string) => void;
  onAddTextConfig: (id: string, text: TText[]) => void;
  onTextConfigChange: (
    carouselId: string,
    textId: string,
    newTextConfig: TTextConfig
  ) => void;
  onI18nChangeCallback: (
    carouselId: string,
    textId: string,
    i18nObject: I18nObject
  ) => void;
}
// 轮播配置组件
export const CarouselSetter: FC<CarouselSetterProps> = ({
  platform,
  imageSize,
  carouselData,
  onAddCarousel,
  onRemoveCarousel,
  onImageChange,
  onDeleteTextConfig,
  onAddTextConfig,
  onTextConfigChange,
  onI18nChangeCallback,
}) => {
  const { ossFilePath } = useTool();

  return (
    <div>
      {carouselData.map((carousel, carouselIndex) => {
        const number = (carouselIndex + 1).toString().padStart(3, '0');
        const label = `轮播图${number}`;

        return (
          <Collapse
            style={{
              marginBottom: '10px',
            }}
            key={carousel.id}
            expandIconPosition="start"
            activeKey={['carousel']}
            items={[
              {
                label: label,
                key: 'carousel',
                extra: (
                  <CloseOutlined
                    style={{
                      zIndex: 999,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCarousel(carousel.id);
                    }}
                  />
                ),
                children: (
                  <>
                    <ImageUpload
                      cropSize={{
                        width: imageSize?.width,
                        height: imageSize?.height,
                      }}
                      isLimitCropSize={true}
                      platform={platform}
                      limitSize={10}
                      uploadOssPath={ossFilePath}
                      ossFile={carousel.image[platform]}
                      onImageChange={(value) =>
                        onImageChange(carousel.id, value)
                      }
                    />
                    <div
                      style={{
                        marginTop: '10px',
                      }}
                    >
                      {carousel?.text?.map((textItem, textIndex) => {
                        const defaultActiveKey = ['textConfig'];
                        // index 为0 补充为文案001
                        const number = (textIndex + 1)
                          .toString()
                          .padStart(3, '0');
                        const label = `文案${number}`;
                        const textConfig = cloneDeep(textItem.config);

                        return (
                          <div key={textItem.id}>
                            <Collapse
                              defaultActiveKey={defaultActiveKey}
                              expandIconPosition="start"
                              items={[
                                {
                                  key: 'textConfig',
                                  label: label,
                                  extra: (
                                    <CloseOutlined
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteTextConfig(
                                          carousel.id,
                                          textItem.id
                                        );
                                      }}
                                    />
                                  ),
                                  children: (
                                    <TextConfig
                                      textConfig={textConfig}
                                      platform={platform}
                                      onTextConfigChange={(newTextConfig) =>
                                        onTextConfigChange(
                                          carousel.id,
                                          textItem.id,
                                          newTextConfig
                                        )
                                      }
                                      onI18nChangeCallback={(
                                        i18nObject: I18nObject
                                      ) => {
                                        onI18nChangeCallback(
                                          carousel.id,
                                          textItem.id,
                                          i18nObject
                                        );
                                      }}
                                    />
                                  ),
                                },
                              ]}
                            ></Collapse>
                            <Divider />
                          </div>
                        );
                      })}
                      <Button
                        type="primary"
                        onClick={() =>
                          onAddTextConfig(carousel.id, carousel.text)
                        }
                        style={{
                          marginBottom: '10px',
                          width: '100%',
                        }}
                      >
                        新增文案
                      </Button>
                    </div>
                  </>
                ),
              },
            ]}
          />
        );
      })}

      <Button
        type="primary"
        onClick={onAddCarousel}
        style={{
          marginBottom: '10px',
          marginTop: '10px',
          width: '100%',
        }}
      >
        新增轮播图
      </Button>
    </div>
  );
};
export default CarouselSetter;
