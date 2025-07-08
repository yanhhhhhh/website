import { useAtomValue } from 'jotai';
import {
  currentChildLabelDataAtom,
  currentLabelDataAtom,
} from '../stores/editor';

export const useTool = () => {
  const currentLabelData = useAtomValue(currentLabelDataAtom);
  const currentChildLabelData = useAtomValue(currentChildLabelDataAtom);
  const ossFilePath = `page-manage/${currentLabelData?.labelName}/${currentChildLabelData?.labelName}/`;
  const i18nModule = `${currentLabelData?.labelName}/${currentLabelData?.id}`;
  const i18nCodePrefix = `${currentChildLabelData?.labelName}`;
  return {
    currentLabelData,
    currentChildLabelData,
    ossFilePath,
    i18nModule,
    i18nCodePrefix,
  };
};
