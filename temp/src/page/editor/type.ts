import { ContentJson } from '@/api/labelContent';
import { I18nData, I18nObject } from '@/api/i18n';
import { uuid } from '@/utils';
export type TPlatform = 'pc' | 'mobile';
export type TComponentState = 'edit' | 'preview' | 'render';
export interface SetterProps {
  contentJson: ContentJson;
  platform: TPlatform;
  onChange: (value: ContentJson) => void;
}
export interface RendererProps {
  contentJson: ContentJson;
  platform: TPlatform;
  //状态
  /**
   * @description
   * - edit: 编辑状态 (读取的cache数据，同时预览区域进行了缩放)
   * - preview: 预览状态(读取的cache数据)
   * - render: 渲染状态
   */
  state: TComponentState;
}

export type TI18nConfig = Omit<I18nData, 'id' | 'languageLists'> & {
  data?: I18nObject;
};
export type TTextPosition = 'custom' | 'center';
export type TTextWrap = 'nowrap' | 'wrap';
export type TStyleConfig = {
  left: number;
  top: number;
  right?: number;
  bottom?: number;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;

  textAlign: string;
  color: string;
  horizontalTextPosition: TTextPosition;
  verticalTextPosition: TTextPosition;
  textWrap: TTextWrap;
};
export const defaultTextConfig = {
  type: 'text',
  externalLink: undefined,
  internalLink: undefined,
  i18n: {
    serviceName: '',
    code: '',
    module: '',
  } as TI18nConfig,
  pc: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.5,
    textAlign: 'left',
    color: '#000000',
    horizontalTextPosition: 'custom',
    verticalTextPosition: 'custom',
    textWrap: 'wrap',
  } as TStyleConfig,
  mobile: {
    left: 10,
    top: 10,
    right: 0,
    bottom: 0,
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 1.2,
    textAlign: 'left',
    color: '#000000',
    horizontalTextPosition: 'custom',
    verticalTextPosition: 'custom',
    textWrap: 'wrap',
  } as TStyleConfig,
};

export const defalutText = {
  id: uuid(),
  config: defaultTextConfig,
  data: undefined,
};
export type TSizeUnit = 'px' | 'vw' | 'vh';
