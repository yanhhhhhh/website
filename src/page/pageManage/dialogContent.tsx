import { getLabelList } from '@/api/label';
import { PageObject, add, update } from '@/api/pageManage';
import { version } from '@/constants';
import { message } from '@/providers';
import { templateGroupMapAtom } from '@/stores';
import { Button, Divider, Flex, Form, Input, Select, Tooltip } from 'antd';
import { useAtomValue, useSetAtom } from 'jotai';
import { isEqual } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
import { Editor } from '../editor';
import { menuLabelListValueAtom } from '../editor/stores/editor';
import './dialogContent.less';
import { getList, TMenuListItem } from '@/api/menuManage';
export interface DialogContentParams {
  record?: PageObject;
}
export interface DialogContentProps extends DialogContentParams {
  type: 'Add' | 'Edit';

  onCloseDialog: () => void;
}

export const DialogContent: FC<DialogContentProps> = ({
  record,
  type,
  onCloseDialog,
}) => {
  const templateGroupOptions = useAtomValue(templateGroupMapAtom);

  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<PageObject>();
  const setMenuLabelListValue = useSetAtom(menuLabelListValueAtom);
  const [topMenuList, setTopMenuList] = useState<TMenuListItem[]>([]);
  const [bottomMenuList, setBottomMenuList] = useState<TMenuListItem[]>([]);
  const [isExited, setIsExited] = useState(false);
  useEffect(() => {
    if (!record) {
      form.resetFields(); // 重置表单字段
      return;
    }

    form.setFieldsValue({
      pageName: record?.pageName,
      templateGroupIds: record?.templateGroupIds,
      pageVersion: record?.pageVersion,
      headerLabelTemplateId: record?.headerLabelTemplateId,
      tailLabelTemplateId: record?.tailLabelTemplateId,
    });
    setCurrentRecord(record);
  }, [form, record, type]);

  useEffect(() => {
    fetchTopMenuList();
  }, []);
  const headerLabelTemplateId = Form.useWatch('headerLabelTemplateId', form);

  const onNextStep = async () => {
    await form
      .validateFields()
      .then(async (values) => {
        let currentRecordCache: PageObject | null = null;
        // 通过上一步返回的record 使用编辑的接口
        if (type === 'Edit' || isExited) {
          // 编辑: 判断是否有修改
          const value = {} as any;
          // 优化: 只更新修改的字段
          let updateRecord = record;
          if (isExited) {
            // 点击上一步 赋值当前record的值
            updateRecord = currentRecord;
          }
          Object.keys(values).forEach((key) => {
            if (
              !isEqual(updateRecord?.[key as keyof PageObject], values[key])
            ) {
              value[key] = values[key];
            }
          });

          setConfirmLoading(true);
          const { code, msg } = (await update(updateRecord!.id, value)).data;

          if (code !== 200) {
            message.error(`编辑失败:${msg}`);
            setConfirmLoading(false);
            return;
          }
          currentRecordCache = { ...updateRecord, ...value };
          setCurrentRecord({ ...updateRecord, ...values });
        } else {
          // 新增
          setConfirmLoading(true);
          const { code, msg, data } = (await add(values)).data;

          if (code !== 200) {
            message.error(`新增失败:${msg}`);
            setConfirmLoading(false);
            return;
          }
          const { templateGroupIds } = values;
          if (!data?.templateGroupIds) {
            data.templateGroupIds = templateGroupIds;
          }
          setIsExited(true);
          currentRecordCache = data;
          setCurrentRecord(data);
        }
        // 获取标签列表,再进入编辑界面
        await fetchLabelList(currentRecordCache);
      })
      .catch((e) => {
        console.error(e);
      });

    return;
  };
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
  const fetchBottomMenuList = async (linkLabelTemplateId: string) => {
    await getList({
      pageNum: 1,
      pageSize: 99999,
      labelSource: 3,
      linkLabelTemplateId,
    }).then((res) => {
      const { code, data } = res.data;
      if (code == 200) {
        const { list } = data;
        const tailLabelTemplateId = form.getFieldValue('tailLabelTemplateId');

        if (!list.find((item) => item.id === tailLabelTemplateId)) {
          form.setFieldValue('tailLabelTemplateId', undefined);
        }
        setBottomMenuList(list);
      }
    });
  };
  const onPrevStep = () => {
    setStep(0);
  };
  const topMenuOptions = topMenuList.map((item) => {
    return {
      label: item.labelTemplateName,
      value: item.id,
    };
  });
  const bottomMenuOptions = bottomMenuList.map((item) => {
    return {
      label: item.labelTemplateName,
      value: item.id,
    };
  });
  const fetchLabelList = async (currentRecord: PageObject | null) => {
    if (!currentRecord) return [];

    const { data } = await getLabelList({ pageId: currentRecord.id });
    const { code, msg, data: res } = data;
    setConfirmLoading(false);
    if (code == 200) {
      setMenuLabelListValue(res);
      // 进入编辑界面
      setStep(1);
    } else {
      message.error(msg);
    }
  };
  const handlePreview = () => {
    if (!currentRecord || !currentRecord?.templateGroupIds) {
      message.error('缺少模版参数');
      return;
    }
    const templateGroupIdsString = currentRecord.templateGroupIds?.join(',');
    const openUrl = `${window.location.origin}${
      import.meta.env.VITE_ROUTER_BASE
    }/?preview=${currentRecord.id}&templateGroupIds=${templateGroupIdsString}`;
    window.open(openUrl, '_blank');
  };

  useEffect(() => {
    fetchBottomMenuList(headerLabelTemplateId);
  }, [headerLabelTemplateId]);
  return (
    <div className="hero-page-manage-dialog-content">
      <Flex justify="space-between">
        <Form
          form={form}
          layout="inline"
          // preserve={false}

          style={{
            marginBottom: 10,
          }}
          disabled={step == 1}
        >
          <Form.Item
            label="页面名称"
            name="pageName"
            rules={[
              {
                required: true,
                message: '请输入页面名称',
              },
            ]}
          >
            <Input placeholder="请输入页面名称" />
          </Form.Item>
          <Form.Item
            label="模版名称"
            name={'templateGroupIds'}
            rules={[
              {
                required: true,
                message: '请选择模版',
                type: 'array',
              },
            ]}
          >
            <Select
              style={{ width: 200 }}
              options={templateGroupOptions}
              allowClear
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            label="版本号"
            name={'pageVersion'}
            rules={[
              {
                required: true,
                message: '请输入版本号',
              },
            ]}
          >
            <Select style={{ width: 120 }} allowClear options={version} />
          </Form.Item>
          <Form.Item>
            <Flex>
              <Form.Item
                label="顶部菜单"
                name="headerLabelTemplateId"
                rules={[
                  {
                    required: true,
                    message: '请选择顶部菜单',
                  },
                ]}
              >
                <Select style={{ minWidth: 120 }} options={topMenuOptions} />
              </Form.Item>
              <Form.Item
                label="底部导航"
                name="tailLabelTemplateId"
                rules={[
                  {
                    required: true,
                    message: '请选择底部导航',
                  },
                ]}
              >
                <Select
                  disabled={!headerLabelTemplateId || step == 1}
                  placeholder="请先选择顶部菜单并且在底部导航管理关联对应的顶部导航"
                  style={{ minWidth: 180 }}
                  options={bottomMenuOptions}
                />
              </Form.Item>
            </Flex>
          </Form.Item>
        </Form>
        {step == 0 && (
          <Flex justify="end">
            <Button
              type="primary"
              loading={confirmLoading}
              onClick={onNextStep}
            >
              下一步
            </Button>
          </Flex>
        )}
        {step == 1 && (
          <Tooltip placement="topLeft" title="请先保存再进行预览">
            <Button type="primary" onClick={handlePreview}>
              预览
            </Button>
          </Tooltip>
        )}
      </Flex>

      <Divider
        style={{
          margin: '10px 0',
        }}
      />
      <div className="bottom">
        {step == 1 && (
          <Editor onPrevStep={onPrevStep} record={currentRecord!} />
        )}
      </div>
    </div>
  );
};
