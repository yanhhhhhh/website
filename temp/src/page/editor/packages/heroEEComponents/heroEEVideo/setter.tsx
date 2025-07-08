import { SetterProps } from '@/pages/editor/type';
import { Collapse, CollapseProps } from 'antd';
import { FC } from 'react';
import defaultSetter from './defaultSetter';
import { SizeConfig, VideoUpload } from '../../heroEEBaseSetters';
import { useTool } from '@/pages/editor/hooks/useTool';
import { TFile } from '@/api/file';
import { merge, set } from 'lodash-es';
import { ContentJson } from '@/api/labelContent';
import { maxSize } from '@/pages/editor/constant';
import { useSetAtom } from 'jotai';
import { needDeleleOssFileIdsCacheAtom } from '@/pages/editor/stores/editor';

const defaultActiveKey = ['sizeConfig', 'componentConfig'];
const Setter: FC<SetterProps> = (props) => {
  const setNeedDeleleOssFileIdsCache = useSetAtom(
    needDeleleOssFileIdsCacheAtom
  );

  const { contentJson, onChange, platform } = props;

  const config = merge({}, defaultSetter, contentJson);
  const configComponentProps = config.componentProps?.[platform];
  const configStyle = config.componentProps?.style?.[platform];
  const { ossFilePath } = useTool();

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
  const onVideoChange = (info: TFile) => {
    const preVideo = configComponentProps?.video;
    if (preVideo) {
      setNeedDeleleOssFileIdsCache((pre) => [...pre, preVideo?.fileManageId]);
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.${platform}.video`,
      info
    );
    onChange(newConfig);
  };
  const onVideoPosterChange = (info?: TFile) => {
    if (!info) {
      setNeedDeleleOssFileIdsCache((pre) => [
        ...pre,
        configComponentProps?.image?.fileManageId,
      ]);
    }
    const newConfig = set<ContentJson>(
      contentJson,
      `componentProps.${platform}.poster`,
      info
    );
    onChange(newConfig);
  };
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
              widthUnit: configStyle?.widthUnit,
              heightUnit: configStyle?.heightUnit,
              maxWidth: maxSize[platform].width,
              maxHeight: maxSize[platform].height,
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
          <VideoUpload
            uploadOssPath={ossFilePath}
            platform={platform}
            ossFile={configComponentProps?.video}
            ossFilePoster={configComponentProps?.poster}
            onVideoChange={onVideoChange}
            onVideoPosterChange={onVideoPosterChange}
            size={{ width: configStyle?.width, height: configStyle?.height }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="heroEEVideoSetter">
        <Collapse items={items} defaultActiveKey={defaultActiveKey} />
      </div>
    </>
  );
};
export default Setter;
