import { I18nObject } from '@/api/i18n';
import { useLocale } from '@/hooks';
import { editorCurrentLanguageCodeAtom } from '@/pages/editor/stores/editor';
import { TComponentState, TTextWrap } from '@/pages/editor/type';
import { useAtomValue } from 'jotai';
import { FC, useMemo } from 'react';
interface I18nTextProps {
  i18nData: I18nObject;
  state: TComponentState;
  textWrap?: TTextWrap;
}
export const I18nText: FC<I18nTextProps> = (props) => {
  const currentLanguageCode = useAtomValue(editorCurrentLanguageCodeAtom);
  const { i18nData, state } = props;
  const { getI18nBackEndKey } = useLocale();

  const key = useMemo(() => {
    if (state == 'edit') {
      return currentLanguageCode;
    } else {
      return getI18nBackEndKey;
    }
  }, [currentLanguageCode, getI18nBackEndKey, state]);
  const i18nText = i18nData?.[key as keyof typeof i18nData];

  return (
    <div
      className="whitespace-break-spaces"
      style={{
        textWrap: props.textWrap,
      }}
    >
      {i18nText}
    </div>
  );
};
