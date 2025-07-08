import { Language } from '@/api/i18n';
import { atom } from 'jotai';

export const languagesDictAtom = atom<Language[]>([]);
export const editorCurrentLanguageCodeAtom = atom<string>('zh_cn');
