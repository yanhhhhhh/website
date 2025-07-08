import {
  I18nData,
  I18nObject,
  TLanguageObject,
  i18nSaveUpdate,
} from '@/api/i18n';
import { useI18n } from '@/pages/editor/hooks/useI18n';
import { TI18nConfig } from '@/pages/editor/type';

import { modal, message } from '@/providers';
import { uuid } from '@/utils';
import { Button, Form, Input, Space } from 'antd';
import { cloneDeep } from 'lodash-es';

import React, { FC, useEffect } from 'react';

const serviceName = 'page-manage';
export interface ModalContentParams {
  onChangeI18nData: (data: TI18nConfig) => void;
  record?: I18nObject;
  onUpdateLanguageLists: (code: string) => void;
}
interface ModalContentProps extends ModalContentParams {
  type: 'Add' | 'Edit';

  dialog: React.MutableRefObject<ReturnType<typeof modal.confirm> | undefined>;
}

export const ModalContent: FC<ModalContentProps> = (props) => {
  const [form] = Form.useForm();
  const { record, dialog, onChangeI18nData, type, onUpdateLanguageLists } =
    props;

  const { i18nModule: module, i18nCodePrefix, languagesDict } = useI18n();

  const onFinish = async (values: any) => {
    const languageLists = Object.entries(values).map(
      ([languageCode, value]) => ({
        languageCode,
        languageContent: value as string,
      })
    );

    let i18nNewData = {};
    const id = uuid();
    const i18nCode = `${i18nCodePrefix}/${id}`;
    if (type == 'Add') {
      i18nNewData = {
        serviceName,
        module,
        code: i18nCode,
        languageLists,
      };
    } else {
      i18nNewData = {
        serviceName: record?.serviceName,
        module: record?.module,
        code: record?.code,
        languageLists,
        id: record?.id,
      };
    }

    i18nSaveUpdate(i18nNewData).then((res) => {
      const { data } = res;
      const { code, msg } = data;
      if (code === 200) {
        if (type == 'Add') {
          // 编辑时不需要重新生成code
          onChangeI18nData({
            serviceName,
            module,
            code: i18nCode,
          });
          onUpdateLanguageLists(i18nCode);
        } else {
          onChangeI18nData({
            serviceName: record!.serviceName,
            module: record!.module,
            code: record!.code,
          });
          onUpdateLanguageLists(record!.code);
        }

        message.success('操作成功');
        dialog.current?.destroy();
      } else {
        message.error('操作失败' + msg);
      }
    });
    dialog.current?.destroy();
  };
  const onCancel = () => {
    dialog.current?.destroy();
  };
  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);
  return (
    <div className="i18n-modal-content">
      {languagesDict && (
        <Form form={form} onFinish={onFinish}>
          {languagesDict?.map((item) => {
            return (
              <Form.Item
                label={item.languageName}
                name={item.languageCode}
                key={item.languageCode}
                rules={
                  item.languageCode === 'zh_cn'
                    ? [{ required: true, message: '请输入中文' }]
                    : []
                }
              >
                <Input />
              </Form.Item>
            );
          })}
          <Form.Item wrapperCol={{ offset: 16 }}>
            <Space>
              <Button onClick={onCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
