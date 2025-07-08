import { ContentJson } from '@/api/labelContent';
import { Button, Collapse, CollapseProps, Divider } from 'antd';
import { FC } from 'react';
import { ImageUpload, SizeConfig, TextConfig } from '../../heroEEBaseSetters';
import defaultSetter, { TText, TTextConfig } from './defaultSetter';

import { TFile } from '@/api/file';
import { I18nObject } from '@/api/i18n';
import { maxSize } from '@/pages/editor/constant';
import { useTool } from '@/pages/editor/hooks/useTool';
import {
  needDeleleI18bIdsCacheAtom,
  needDeleleOssFileIdsCacheAtom,
} from '@/pages/editor/stores/editor';
import { defalutText, SetterProps } from '@/pages/editor/type';
import { message } from '@/providers';
import { uuid } from '@/utils';
import { CloseOutlined } from '@ant-design/icons';
import { set } from 'es-toolkit/compat';
import { useSetAtom } from 'jotai';
import { merge } from 'lodash-es';

const defaultActiveKey = ['sizeConfig', 'componentConfig', 'textConfig'];
const Setter: FC<SetterProps> = (props) => {
  const setNeedDeleleI18bIdsCache = useSetAtom(needDeleleI18bIdsCacheAtom);
  const setNeedDeleleOssFileIdsCache = useSetAtom(
    needDeleleOssFileIdsCacheAtom
  );
  const { contentJson, onChange, platform } = props;
  const config = merge({}, defaultSetter, contentJson);

  const configComponentProps = config.componentProps?.[platform];
  const configStyle = config.componentProps?.style?.[platform];

  const textConfigList = (config.componentProps?.text ?? []) as TText[];

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
  const onAddTextConfig = () => {
    const number = textConfigList.length;
    if (number > 100) {
      message.error('文案配置最多支持100个');
      return;
    }

    const newConfig = set<ContentJson>(contentJson, `componentProps.text`, [
      ...textConfigList,
      {
        ...defalutText,
        id: uuid(),
      },
    ]);
    onChange(newConfig);
  };
  const onImageChange = (info?: TFile) => {
    if (!info) {
      setNeedDeleleOssFileIdsCache((pre) => [
        ...pre,
        configComponentProps?.image?.fileManageId,
      ]);
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.${platform}.image`,
      info
    );
    onChange(newConfig);
  };

  const onTextConfigDelete = (id: string) => {
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.text`,
      textConfigList.filter((t: TText) => t.id !== id)
    );
    const delId = textConfigList.find((t: TText) => t.id === id)?.i18nData?.id;

    delId && setNeedDeleleI18bIdsCache((pre) => [...pre, delId]);

    onChange(newConfig);
  };

  const { ossFilePath } = useTool();

  const items: CollapseProps['items'] = [
    {
      key: 'sizeConfig',
      label: '尺寸设置',
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
      key: 'componentConfig',
      label: '组件配置',
      children: (
        <div>
          <div>
            <span
              style={{
                marginRight: '10px',
                fontWeight: 'bold',
                fontSize: '14px',
                // color: '#1761FF',
              }}
            >
              {platform}
            </span>
            {configStyle?.width && <span>宽度：{configStyle.width}，</span>}
            {configStyle?.height && <span>高度：{configStyle.height}</span>}
          </div>
          <ImageUpload
            uploadOssPath={ossFilePath}
            limitSize={10}
            isLimitCropSize={true}
            platform={platform}
            cropSize={{
              width: configStyle?.width,
              height: configStyle?.height,
            }}
            ossFile={configComponentProps?.image}
            onImageChange={onImageChange}
          />
          <div>建议10M以下，图片格式为jpg/png/webp</div>
        </div>
      ),
    },
    {
      key: 'textConfig',
      label: '文案配置',
      children: (
        <div>
          {textConfigList.map((text: TText, index: number) => {
            const defaultActiveKey = ['textConfig'];
            // index 为0 补充为文案001
            const number = (index + 1).toString().padStart(3, '0');
            const label = `文案${number}`;
            const config = text.config;
            const onI18nChangeCallback = (i18nObject: I18nObject) => {
              const newItem = set<TText>(text, 'i18nData', i18nObject);
              const newConfig = set<ContentJson>(
                contentJson,
                `componentProps.text`,
                textConfigList.map((t: TText) =>
                  t.id === text.id
                    ? {
                        ...t,
                        ...newItem,
                      }
                    : t
                )
              );
              onChange(newConfig);
            };

            const onTextConfigChange = (newTextConfig: TTextConfig) => {
              const newItem = set<TText>(text, 'config', newTextConfig);
              const newConfigList = textConfigList.map((t: TText) =>
                t.id === text.id
                  ? {
                      ...t,
                      ...newItem,
                    }
                  : t
              );
              const newConfig = set<ContentJson>(
                contentJson,
                `componentProps.text`,
                newConfigList
              );
              onChange(newConfig);
            };
            return (
              <div key={text.id}>
                <Collapse
                  defaultActiveKey={defaultActiveKey}
                  expandIconPosition="start"
                  items={[
                    {
                      key: 'textConfig',
                      label: label,
                      extra: (
                        <CloseOutlined
                          onClick={() => onTextConfigDelete(text.id)}
                        />
                      ),
                      children: (
                        <TextConfig
                          {...{
                            textConfig: config,
                            platform,
                            onTextConfigChange,
                            onI18nChangeCallback,
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
            onClick={onAddTextConfig}
            style={{
              marginBottom: '10px',
              width: '100%',
            }}
          >
            新增文案
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="HeroEEImageSetter">
        <Collapse items={items} defaultActiveKey={defaultActiveKey} />
      </div>
    </>
  );
};
export default Setter;
