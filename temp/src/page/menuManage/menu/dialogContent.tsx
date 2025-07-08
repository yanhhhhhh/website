import { TMenuListItem, add, getList, update } from '@/api/menuManage';

import { message } from '@/providers';

import { Button, Flex, Form, Input, Select, Tag } from 'antd';

import { FC, useEffect, useState } from 'react';
import { IMenuType, menuMap } from './constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export interface DialogContentParams {
  record?: TMenuListItem;
}
export interface DialogContentProps extends DialogContentParams {
  type: 'Add' | 'Edit';

  onCloseDialog: () => void;
  menuType: IMenuType;
}

export const DialogContent: FC<DialogContentProps> = ({
  record,
  type,
  onCloseDialog,
  menuType,
}) => {
  const [topMenuList, setTopMenuList] = useState<TMenuListItem[]>([]);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (!record) {
      form.resetFields(); // 重置表单字段
      return;
    }

    form.setFieldsValue({
      ...record,
    });
    // 后端long 类型 默认值为'0', 但是antd form 会将其转换为0
    if (record.linkLabelTemplateId == '0') {
      form.setFieldsValue({
        linkLabelTemplateId: undefined,
      });
    }
  }, [form, record, type]);
  const fetchTopMenuList = async () => {
    await getList({
      pageNum: 1,
      pageSize: 99999,
      labelSource: 1,
    }).then((res) => {
      const { code, data } = res.data;
      if (code == 200) {
        const { list } = data;
        setTopMenuList(list);
      }
    });
  };
  useEffect(() => {
    if (menuType == 'bottom') {
      fetchTopMenuList();
    }
  }, [menuType]);
  const onConfirm = async () => {
    await form
      .validateFields()
      .then(async (values) => {
        if (type === 'Add') {
          // 新增
          setConfirmLoading(true);
          const { code, msg } = (
            await add({
              ...values,
              labelSource: menuMap[menuType].labelSource,
            })
          ).data;

          if (code !== 200) {
            message.error(`新增失败:${msg}`);
            setConfirmLoading(false);
            return;
          }
          message.success('新增成功');
          onCloseDialog();
        }
        if (type === 'Edit') {
          setConfirmLoading(true);

          const updateValues =
            menuType == 'bottom'
              ? {
                  ...values,
                  linkLabelTemplateId: values.linkLabelTemplateId
                    ? values.linkLabelTemplateId
                    : '0',
                }
              : values;

          const { code, msg } = (await update(record!.id, updateValues)).data;

          if (code !== 200) {
            message.error(`编辑失败:${msg}`);
            setConfirmLoading(false);
            return;
          }
          message.success('编辑成功');
          onCloseDialog();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <Form
        form={form}
        style={{
          marginBottom: 10,
        }}
      >
        <Form.Item
          label={menuMap[menuType].formNameText}
          name="labelTemplateName"
          rules={[
            {
              required: true,
              message: `请输入${menuMap[menuType].formNameText}`,
            },
          ]}
        >
          <Input placeholder={`请输入${menuMap[menuType].formNameText}`} />
        </Form.Item>
        {menuType == 'bottom' && (
          <>
            <Form.Item label="关联的顶部导航" name="linkLabelTemplateId">
              <Select
                allowClear
                placeholder="请选择关联的顶部导航"
                style={{
                  width: '100%',
                }}
                options={topMenuList.map((item) => {
                  return {
                    label: item.labelTemplateName,
                    value: item.id,
                  };
                })}
              ></Select>
            </Form.Item>
            <Tag icon={<ExclamationCircleOutlined />} color="error">
              修改关联的顶部导航会清空之前配置的菜单
            </Tag>
          </>
        )}
        <Form.Item>
          <Flex justify="end">
            <Button
              style={{
                marginRight: 10,
              }}
              onClick={onCloseDialog}
            >
              取消
            </Button>

            <Button type="primary" loading={confirmLoading} onClick={onConfirm}>
              确定
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
