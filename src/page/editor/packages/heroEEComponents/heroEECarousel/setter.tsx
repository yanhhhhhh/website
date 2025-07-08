import { defalutText, SetterProps } from '@/pages/editor/type';
import { FC } from 'react';

import { TFile } from '@/api/file';
import { I18nObject } from '@/api/i18n';
import { ContentJson } from '@/api/labelContent';
import { maxSize } from '@/pages/editor/constant';
import {
  needDeleleI18bIdsCacheAtom,
  needDeleleOssFileIdsCacheAtom,
} from '@/pages/editor/stores/editor';
import { uuid } from '@/utils';
import { Collapse, message } from 'antd';
import { CollapseProps } from 'antd/lib';
import { set } from 'es-toolkit/compat';
import { useSetAtom } from 'jotai';
import { merge } from 'lodash-es';
import { SizeConfig } from '../../heroEEBaseSetters';
import { TText, TTextConfig } from '../heroEEImage/defaultSetter';
import defaultSetter, {
  CarouselData,
  defaultCarouselData,
} from './defaultSetter';
import CarouselSetter from './setter/carouselSetter';

const defaultActiveKey = ['sizeConfig', 'componentConfig'];
const Setter: FC<SetterProps> = (props) => {
  const setNeedDeleleI18bIdsCache = useSetAtom(needDeleleI18bIdsCacheAtom);
  const setNeedDeleleOssFileIdsCache = useSetAtom(
    needDeleleOssFileIdsCacheAtom
  );
  const { contentJson, onChange, platform } = props;

  const config = merge({}, defaultSetter, contentJson);

  const configStyle = config.componentProps?.style?.[platform];

  const carouselData = (config.componentProps?.carouselData ??
    []) as CarouselData[];
  const onSizeChange = (value: { width: number; height: number }) => {
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.style.${platform}`,
      value
    );

    onChange(newConfig);
  };
  const onSizeUnitChange = (value: {
    widthUnit: string;
    heightUnit: string;
  }) => {
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.style.${platform}`,
      {
        ...configStyle,
        ...value,
      }
    );

    onChange(newConfig);
  };
  const onAddCarousel = () => {
    const number = carouselData.length;
    if (number > 5) {
      message.error('文案配置最多支持5个');
      return;
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData`,
      [
        ...carouselData,
        {
          ...defaultCarouselData,
          id: uuid(),
        },
      ]
    );
    onChange(newConfig);
  };
  const onRemoveCarousel = (id: string) => {
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData`,
      carouselData.filter((item) => item.id !== id)
    );
    onChange(newConfig);
    const delIds = carouselData
      .find((item) => item.id === id)
      ?.text.map((t: TText) => t.i18nData.id);
    delIds && setNeedDeleleI18bIdsCache((pre) => [...pre, ...delIds]);
  };
  const onImageChange = (carouselId: string, value?: TFile) => {
    const index = carouselData.findIndex((item) => item.id === carouselId);
    if (!value) {
      setNeedDeleleOssFileIdsCache((pre) => [
        ...pre,
        carouselData[index].image[platform]?.fileManageId,
      ]);
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData.${index}.image.${platform}`,
      value
    );

    onChange(newConfig);
  };

  const onAddTextConfig = (id: string, text: TText[]) => {
    const index = carouselData.findIndex((item) => item.id === id);
    const number = text.length;
    if (number > 100) {
      message.error('文案配置最多支持100个');
      return;
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData.${index}.text`,
      [
        ...text,
        {
          ...defalutText,
          id: uuid(),
        },
      ]
    );
    onChange(newConfig);
  };
  const onDeleteTextConfig = (carouselId: string, textId: string) => {
    const index = carouselData.findIndex((item) => item.id === carouselId);
    const newText = carouselData[index].text.filter(
      (item) => item.id !== textId
    );
    const delId = carouselData[index].text.find((t: TText) => t.id === textId)
      ?.i18nData?.id;
    delId && setNeedDeleleI18bIdsCache((pre) => [...pre, delId]);
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData.${index}.text`,
      newText
    );

    onChange(newConfig);
  };
  const onTextConfigChange = (
    carouselId: string,
    textId: string,
    newTextConfig: TTextConfig
  ) => {
    const index = carouselData.findIndex((item) => item.id === carouselId);
    const textIndex = carouselData[index].text.findIndex(
      (item) => item.id === textId
    );
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData.${index}.text.${textIndex}.config`,
      newTextConfig
    );
    onChange(newConfig);
  };
  const onI18nChangeCallback = (
    carouselId: string,
    textId: string,
    i18nObject: I18nObject
  ) => {
    const index = carouselData.findIndex((item) => item.id === carouselId);
    const textIndex = carouselData[index].text.findIndex(
      (item) => item.id === textId
    );
    const newTextItem = set<TText>(
      carouselData[index].text[textIndex],
      'i18nData',
      i18nObject
    );
    const newTextList = carouselData[index].text.map((t: TText) =>
      t.id === textId
        ? {
            ...t,
            ...newTextItem,
          }
        : t
    );
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.carouselData.${index}.text`,
      newTextList
    );
    onChange(newConfig);
  };
  const items: CollapseProps['items'] = [
    {
      label: '尺寸配置',
      key: 'sizeConfig',
      children: (
        <>
          <SizeConfig
            {...{
              title: platform,
              width: configStyle?.width,
              height: configStyle?.height,
              maxWidth: maxSize[platform].width,
              maxHeight: maxSize[platform].height,
              widthUnit: configStyle?.widthUnit,
              heightUnit: configStyle?.heightUnit,
              platform,
              onSizeChange,
              onSizeUnitChange,
            }}
          />
        </>
      ),
    },
    {
      label: '组件配置',
      key: 'componentConfig',
      children: (
        <CarouselSetter
          platform={platform}
          imageSize={configStyle}
          carouselData={carouselData}
          onAddCarousel={onAddCarousel}
          onRemoveCarousel={onRemoveCarousel}
          onImageChange={onImageChange}
          onDeleteTextConfig={onDeleteTextConfig}
          onAddTextConfig={onAddTextConfig}
          onTextConfigChange={onTextConfigChange}
          onI18nChangeCallback={onI18nChangeCallback}
        />
        // <div>
        //   {carouselData.map((carousel, carouselIndex) => {
        //     const number = (carouselIndex + 1).toString().padStart(3, '0');
        //     const label = `轮播图${number}`;

        //     return (
        //       <Collapse
        //         style={{
        //           marginBottom: '10px',
        //         }}
        //         key={carousel.id}
        //         expandIconPosition="start"
        //         activeKey={['carousel']}
        //         items={[
        //           {
        //             label: label,
        //             key: 'carousel',
        //             extra: (
        //               <CloseOutlined
        //                 style={{
        //                   zIndex: 999,
        //                 }}
        //                 onClick={(e) => {
        //                   e.stopPropagation();
        //                   onRemoveCarousel(carousel.id);
        //                 }}
        //               />
        //             ),
        //             children: (
        //               <>

        //                 <ImageUpload
        //                   cropSize={{
        //                     width: configStyle?.width,
        //                     height: configStyle?.height,
        //                   }}
        //                   isLimitCropSize={true}
        //                   platform={platform}
        //                   limitSize={10}
        //                   uploadOssPath={ossFilePath}
        //                   ossFile={carousel.image[platform]}
        //                   onImageChange={(value: TFile) => {
        //                     const newConfig = set<ContentJson>(
        //                       contentJson,
        //                       `componentProps.carouselData.${carouselIndex}.image.${platform}`,
        //                       value
        //                     );
        //                     onChange(newConfig);
        //                   }}
        //                 />
        //                 <div
        //                   style={{
        //                     marginTop: '10px',
        //                   }}
        //                 >
        //                   {carousel?.text?.map((textItem, textIndex) => {
        //                     const defaultActiveKey = ['textConfig'];
        //                     // index 为0 补充为文案001
        //                     const number = (textIndex + 1)
        //                       .toString()
        //                       .padStart(3, '0');
        //                     const label = `文案${number}`;
        //                     const textConfig = cloneDeep(textItem.config);
        //                     const onTextConfigChange = (
        //                       newTextConfig: TTextConfig
        //                     ) => {
        //                       const newConfig = set<ContentJson>(
        //                         contentJson,
        //                         `componentProps.carouselData.${carouselIndex}.text.${textIndex}.config`,
        //                         newTextConfig
        //                       );
        //                       onChange(newConfig);
        //                     };
        //                     const onI18nChangeCallback = (
        //                       i18nObject: I18nObject
        //                     ) => {
        //                       console.log('carousel i18nObject', i18nObject);
        //                       const newTextItem = set<TText>(
        //                         textItem,
        //                         'i18nData',
        //                         i18nObject
        //                       );
        //                       const newTextList = carousel.text.map(
        //                         (t: TText) =>
        //                           t.id === textItem.id
        //                             ? {
        //                                 ...t,
        //                                 ...newTextItem,
        //                               }
        //                             : t
        //                       );
        //                       const newConfig = set<ContentJson>(
        //                         contentJson,
        //                         `componentProps.carouselData.${carouselIndex}.text`,
        //                         newTextList
        //                       );
        //                       console.log(newConfig === contentJson);

        //                       onChange(newConfig);
        //                     };
        //                     return (
        //                       <div key={textItem.id}>
        //                         <Collapse
        //                           defaultActiveKey={defaultActiveKey}
        //                           expandIconPosition="start"
        //                           items={[
        //                             {
        //                               key: 'textConfig',
        //                               label: label,
        //                               extra: (
        //                                 <CloseOutlined
        //                                   onClick={(e) => {
        //                                     e.stopPropagation();
        //                                     onDeleteTextConfig(
        //                                       carousel.id,
        //                                       textItem.id
        //                                     );
        //                                   }}
        //                                 />
        //                               ),
        //                               children: (
        //                                 <TextConfig
        //                                   textConfig={textConfig}
        //                                   platform={platform}
        //                                   onTextConfigChange={
        //                                     onTextConfigChange
        //                                   }
        //                                   onI18nChangeCallback={
        //                                     onI18nChangeCallback
        //                                   }
        //                                 />
        //                               ),
        //                             },
        //                           ]}
        //                         ></Collapse>
        //                         <Divider />
        //                       </div>
        //                     );
        //                   })}
        //                   <Button
        //                     type="primary"
        //                     onClick={() =>
        //                       onAddTextConfig(carousel.id, carousel.text)
        //                     }
        //                     style={{
        //                       marginBottom: '10px',
        //                       width: '100%',
        //                     }}
        //                   >
        //                     新增文案
        //                   </Button>
        //                 </div>
        //               </>
        //             ),
        //           },
        //         ]}
        //       />
        //     );
        //   })}

        //   <Button
        //     type="primary"
        //     onClick={onAddCarousel}
        //     style={{
        //       marginBottom: '10px',
        //       marginTop: '10px',
        //       width: '100%',
        //     }}
        //   >
        //     新增轮播图
        //   </Button>
        // </div>
      ),
    },
  ];

  return (
    <div className="HeroEECarouselSetter">
      <Collapse items={items} defaultActiveKey={defaultActiveKey} />
    </div>
  );
};
export default Setter;
