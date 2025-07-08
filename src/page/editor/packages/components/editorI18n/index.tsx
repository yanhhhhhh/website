import { FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  editorCurrentLanguageCodeAtom,
  languagesDictAtom,
} from '@/pages/editor/stores/editor';
import { Select, Space } from 'antd';
export const EditorI18n: FC = () => {
  const languagesDict = useAtomValue(languagesDictAtom);
  const [currentLanguageCode, setCurrentLanguageCode] = useAtom(
    editorCurrentLanguageCodeAtom
  );

  const options = languagesDict.map((language) => ({
    label: language.languageName,
    value: language.languageCode,
  }));
  const handleChange = (value: string) => {
    setCurrentLanguageCode(value);
  };
  return (
    <Space>
      当前预览语言
      <Select
        options={options}
        value={currentLanguageCode}
        onChange={handleChange}
        style={{ width: 120 }}
      />
    </Space>
  );
};
