import { TComponentState, TPlatform } from '@/pages/editor/type';
import { TText } from '../../heroEEComponents/heroEEImage/defaultSetter';
import { I18nText } from '../i18nText';
import { pxToRem } from '@/pages/editor/utils';
import { useMemo } from 'react';
import { previewScale } from '@/pages/editor/constant';

interface TextRenderProps {
  text: TText;
  platform: TPlatform;
  onTextClick?: (text: TText) => void;
  state: TComponentState;
}

export const TextRender = (props: TextRenderProps) => {
  const { text, platform, state, onTextClick } = props;
  const g = text.config[platform];
  const i18nData = text.i18nData;
  const horizontalTextPosition = g.horizontalTextPosition;
  const verticalTextPosition = g.verticalTextPosition;

  const scale = useMemo(() => {
    return state == 'edit'
      ? platform == 'pc'
        ? previewScale.pc
        : previewScale.mobile
      : 1;
  }, [platform, state]);
  const textPositionStyle = useMemo(() => {
    if (
      horizontalTextPosition === 'center' &&
      verticalTextPosition === 'center'
    ) {
      return {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }
    if (horizontalTextPosition === 'center') {
      return {
        left: '50%',

        top: pxToRem((g.top || 0) / scale, state),

        transform: 'translateX(-50%)',
      };
    }
    if (verticalTextPosition === 'center') {
      return {
        left: pxToRem((g.left || 0) / scale, state),
        top: '50%',
        transform: 'translateY(-50%)',
      };
    }
    return {
      left: pxToRem((g.left || 0) / scale, state),
      top: pxToRem((g.top || 0) / scale, state),
    };
  }, [
    g.left,
    g.top,
    horizontalTextPosition,
    scale,
    state,
    verticalTextPosition,
  ]);

  return (
    <div
      style={{
        position: 'absolute',

        color: g.color,
        right: g.right && pxToRem(g.right / scale, state),
        bottom: g.bottom && pxToRem(g.bottom / scale, state),
        fontSize: pxToRem(g.fontSize / scale, state),
        fontWeight: g.fontWeight,
        pointerEvents: state == 'edit' ? 'none' : undefined, // 编辑模式禁止点击

        ...textPositionStyle,
      }}
    >
      <div onClick={onTextClick ? () => onTextClick(text) : undefined}>
        <I18nText i18nData={i18nData} state={state} textWrap={g.textWrap} />
      </div>
    </div>
  );
};
export default TextRender;
