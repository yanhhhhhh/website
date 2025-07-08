import { useAtomValue } from 'jotai';
import { languagesDictAtom } from '../stores/editor';
import { useTool } from './useTool';

export const useI18n = () => {
  const { i18nModule, i18nCodePrefix } = useTool();
  const languagesDict = useAtomValue(languagesDictAtom);

  return {
    i18nModule,
    i18nCodePrefix,
    languagesDict,
  };
};
