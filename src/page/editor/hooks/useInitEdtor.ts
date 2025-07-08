import { getInternationalizationDict } from '@/api/i18n';
import { useSetAtom } from 'jotai';
import { languagesDictAtom } from '../stores/editor';
import { message } from 'antd';

export function useInitEditor() {
  const setLanguagesDict = useSetAtom(languagesDictAtom);
  const getI18nDict = async () => {
    try {
      const { data } = await getInternationalizationDict();
      const { code, data: res } = data;
      if (code === 200) {
        setLanguagesDict(res.languages);
        return data;
      }
    } catch (error) {
      message.error('获取国际化字典失败');
    }
  };

  const init = async () => {
    await getI18nDict();
  };

  return {
    init,
  };
}
