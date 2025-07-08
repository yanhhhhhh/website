import { AgreementObject } from '@/api/agrreement';
import { LabelObject } from '@/api/label';

import { FileType, fileType } from '@/constants';
import { storePageLabelConfigList } from '@/utils/page';
import { atom } from 'jotai';
export const templateId = atom<string>('');

export const templateGroupMapAtom = atom<
  {
    label: string;
    value: string;
  }[]
>([]);
export const agreementList = atom<AgreementObject[]>([]);
export const agreementMap = atom<
  Record<'en_US' | 'zh_CN', Record<FileType, AgreementObject>>
>({
  en_US: {} as Record<FileType, AgreementObject>,
  zh_CN: {} as Record<FileType, AgreementObject>,
});
export const isInitializedAgreementAtom = atom<boolean>(false);
// 模板的菜单列表
export const templateMenuListAtom = atom<LabelObject[]>([]);
// 模板的标签列表(只过滤出类型是customPage的标签)
export const templateLabelConfigListAtom = atom<LabelObject[]>((get) => {
  const menuList = get(templateMenuListAtom);
  const labelConfigList = storePageLabelConfigList(menuList, []);

  return labelConfigList;
});
export const templateBottomMenuListAtom = atom<LabelObject[]>([]);
