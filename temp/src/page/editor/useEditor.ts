import { deleteOssFile } from '@/api/file';
import { needDeleleOssFileIdsCacheAtom } from './stores/editor/label';
import { delI18nObject } from '@/api/i18n';
import { updateLabelContent } from '@/api/labelContent';
import { message } from '@/providers';
import { useAtom } from 'jotai';
import {
  needDeleleI18bIdsCacheAtom,
  updateLabelCacheAtom,
} from './stores/editor';
import { AxiosResponse } from 'axios';
import { Result } from '@/request';

export const useEditor = () => {
  const [updateLabelCacheValue, setUpdateLabelCache] =
    useAtom(updateLabelCacheAtom);
  const [needDeleleI18bIdsCacheValue, setNeedDeleleI18bIdsCache] = useAtom(
    needDeleleI18bIdsCacheAtom
  );
  const [needDeleleOssFileIdsCacheValue, setNeedDeleleOssFileIdsCache] =
    useAtom(needDeleleOssFileIdsCacheAtom);
  const onSave = () => {
    console.log('============保存=============');

    const promiseList = Array.from(updateLabelCacheValue.entries()).map(
      ([key, value]) => {
        console.log('id', key);
        console.log('contentJson', value);
        return updateLabelContent({
          labelId: key,
          contentJson: JSON.stringify(value),
        });
      }
    );

    // todo 删除不需要的oss文件
    if (promiseList.length === 0) {
      message.success('保存成功');
      return;
    }

    Promise.all(promiseList)
      .then((res) => {
        if (res.some((r) => r.data.code !== 200)) {
          message.error('保存失败');
          return;
        }
        // 删除成功之后删除对应的i18n
        if (needDeleleI18bIdsCacheValue.length > 0) {
          delI18nObject(needDeleleI18bIdsCacheValue).then(() => {
            setNeedDeleleI18bIdsCache([]);
          });
        }

        if (needDeleleOssFileIdsCacheValue.length > 0) {
          deleteOssFile(needDeleleOssFileIdsCacheValue).then(() => {
            setNeedDeleleOssFileIdsCache([]);
          });
        }
        setUpdateLabelCache(new Map());
        message.success('保存成功');
      })
      .catch((e) => {
        message.error('保存失败' + e);
      });
  };

  return {
    onSave,
  };
};
