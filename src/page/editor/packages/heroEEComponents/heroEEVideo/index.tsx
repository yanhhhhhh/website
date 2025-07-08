import { previewScale } from '@/pages/editor/constant';
import { RendererProps } from '@/pages/editor/type';
import { transformSize } from '@/pages/editor/utils';
import { cloneDeep, merge } from 'lodash-es';
import { FC, useMemo } from 'react';
import defaultSetter from './defaultSetter';
import { urlEncode } from '@/utils/url';

const Renderer: FC<RendererProps> = (props) => {
  const { contentJson, platform, state } = props;

  const config = merge({}, defaultSetter, cloneDeep(contentJson));

  const configComponentProps = config.componentProps?.[platform];
  const configStyle = config.componentProps?.style?.[platform];
  const scale = useMemo(() => {
    return state == 'edit'
      ? platform == 'pc'
        ? previewScale.pc
        : previewScale.mobile
      : 1;
  }, [platform, state]);
  const videoUrl = useMemo(() => {
    return urlEncode(configComponentProps?.video?.fileUrlProxy);
  }, [configComponentProps?.video?.fileUrlProxy]);
  return (
    videoUrl && (
      <div
        className="HeroEEVideo"
        style={{
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
        }}
      >
        <video
          controls
          style={{ width: '100%', height: '100%' }}
          poster={`${urlEncode(
            configComponentProps?.poster?.fileUrlProxy
          )}?v=${new Date().getTime()}`}
          src={`${videoUrl}?v=${new Date().getTime()}`}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  );
};
export default Renderer;
