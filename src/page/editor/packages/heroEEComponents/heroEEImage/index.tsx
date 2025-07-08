import { RendererProps } from '@/pages/editor/type';
import { cloneDeep, merge } from 'lodash-es';
import React, { useMemo } from 'react';
import { defaultSetter, TText } from './defaultSetter';

import { previewScale } from '@/pages/editor/constant';
import { transformSize } from '@/pages/editor/utils';
import TextRender from '../../components/textRender';

import { useHeroNavigate } from '@/hooks/useHeroNavigate';
import { urlEncode } from '@/utils/url';

const Renderer: React.FC<RendererProps> = (props) => {
  const { navigateTo } = useHeroNavigate();
  const { contentJson, platform, state } = props;
  //
  const config = merge({}, defaultSetter, cloneDeep(contentJson));

  const configComponentProps = config.componentProps?.[platform];
  const configStyle = config.componentProps?.style?.[platform];

  const textConfigList = useMemo(() => {
    return (config.componentProps?.text ?? []) as TText[];
  }, [config.componentProps]);

  const scale = useMemo(() => {
    return state == 'edit'
      ? platform == 'pc'
        ? previewScale.pc
        : previewScale.mobile
      : 1;
  }, [platform, state]);
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

  const onTextClick = (text: TText) => {
    const config = text.config;
    if (config.type === 'externalLink') {
      window.open(config.externalLink);
      return;
    }
    if (config.type === 'internalLink') {
      navigateTo(config.internalLink);
      return;
    }
  };
  const imageUrl = useMemo(() => {
    return urlEncode(configComponentProps?.image?.fileUrlProxy);
  }, [configComponentProps?.image?.fileUrlProxy]);
  return (
    imageUrl && (
      <div
        className="heroEE-image-renderer"
        style={{
          ...wrapperStyle,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${imageUrl})`,
          position: 'relative',
          backgroundPosition: 'center',
        }}
      >
        <div>
          {textConfigList?.map((text) => {
            return (
              <TextRender
                key={text.id}
                text={text}
                platform={platform}
                onTextClick={onTextClick}
                state={state}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default Renderer;
