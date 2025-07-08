import { getInternationalizationDict, Language } from '@/api/i18n';
import { message } from '@/providers';
import { useEffect, useState } from 'react';

import {
  addMenuDetail,
  getMenuDetail,
  TAddMenuForm,
  TAddMenuObject,
  TMenuObject,
  updateMenuDetail,
} from '@/api/menuManage';

import { Button, Flex, Form, Input, InputNumber, Radio, Select } from 'antd';
import { addChildFormRule } from '../../contants/addChildForm';

import { AddChildDialogContentParms } from '../../hooks/useChildModal';
import { BaseOptionType } from 'antd/es/select';
import {
  bottomMenuLabelTypeOptions,
  bottomNavLabelTypeOptions,
} from '../labelType';
import { TLabelType } from '@/api/label';

export interface AddBottomChildDialogContentProps
  extends AddChildDialogContentParms {
  type: 'Add' | 'Edit';

  onCloseDialog: () => void;
}

const menuComponentMenu = {
  isCustom: false,
  isLink: false,
  linkUrl: '',
  selectPage: undefined,
  router: '',
  component: '',
  routerCode: '',
};

export const AddBottomChildDialogContent = (
  props: AddBottomChildDialogContentProps
) => {
  const { record, menuDetail, type, onCloseDialog, labelLevel } = props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [languagesDict, setLanguagesDict] = useState<Language[]>();
  const [labelTypeOptions, setLabelTypeOptions] = useState<BaseOptionType[]>(
    bottomMenuLabelTypeOptions
  );
  const [bottomNavPageOptions, setBottomNavPageOptions] = useState<
    BaseOptionType[]
  >([]);
  const labelType = Form.useWatch('labelType', form) as TLabelType;

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
  const getParam = () => {
    // 获取图片
    if (menuDetail?.param) {
      const json = JSON.parse(menuDetail.param);
      form.setFieldValue('relatedTopMenuId', json?.relatedTopMenuId);
    }
  };
  const init = async () => {
    await getI18nDict();
    await initBottomNavPageOptions();
    initLabelTypeOptions();

    initForm();
  };
  function initLabelTypeOptions() {
    if (labelLevel == 1) {
      setLabelTypeOptions(bottomMenuLabelTypeOptions);
      return;
    }
    if (labelLevel == 2) {
      setLabelTypeOptions(bottomNavLabelTypeOptions);
      return;
    }
  }
  function initForm() {
    form.resetFields();

    if (type === 'Edit' && menuDetail) {
      getParam();
      form.setFieldsValue({
        ...menuDetail,
      });
      return;
    }
  }
  // 递归child从顶部配置中获取底部配置（所有节点的labelType 不等于menu 和 card 即可）
  function getBottomNavPageOptions(list: TMenuObject[]) {
    const res: BaseOptionType[] = []; // 用于存储结果
    function loop(list: TMenuObject[]) {
      list.forEach((item) => {
        if (['configPage', 'customPage'].includes(item.labelType)) {
          res.push({
            ...item,
            label: item.labelName,
            value: item.id,
            disabled: false,
          });
        }
        if (item.child) {
          loop(item.child);
        }
      });
    }
    loop(list);

    return res;
  }

  async function initBottomNavPageOptions() {
    // 根据关联的顶部导航，获取可以配置的底部导航页面
    const res = await getMenuDetail(record.linkLabelTemplateId, 1);
    const { data, code } = res.data;
    if (code === 200) {
      const options = getBottomNavPageOptions(data);
      setBottomNavPageOptions(options);
    }
  }
  async function sumbitForm(values: any) {
    const { relatedTopMenuId, ...formValues } = values;

    try {
      setConfirmLoading(true);
      if (type === 'Add') {
        let addParams = {
          param: JSON.stringify({
            relatedTopMenuId,
          }),
        } as TAddMenuObject;
        // 一级菜单
        if (menuDetail === undefined) {
          addParams = {
            ...(formValues as TAddMenuForm),
            ...addParams,
            routerCode: '',
            labelName: formValues.i18nLabelNameJson.zh_cn,
            labelTemplateId: record.id,
            labelSource: record.labelSource,
            parentId: '0',
            labelLevel: labelLevel,
          };
        } else {
          // 二级菜单
          addParams = {
            ...(formValues as TAddMenuForm),
            ...addParams,

            labelName: values.i18nLabelNameJson.zh_cn,
            labelTemplateId: menuDetail.labelTemplateId,
            labelSource: menuDetail.labelSource,
            parentId: menuDetail.id,
            labelLevel: labelLevel,
            routerCode: menuDetail.routerCode,
          };
        }

        const res = await addMenuDetail(addParams);
        if (res.data.code === 200) {
          message.success('新增成功');
          onCloseDialog();
        } else {
          message.error(`新增失败  ${res.data.msg}`);
        }
        setConfirmLoading(false);
      }
      if (type === 'Edit' && menuDetail) {
        let paramJson = {} as any;
        paramJson.relatedTopMenuId = relatedTopMenuId;
        if (menuDetail.param) {
          paramJson = JSON.parse(menuDetail.param);
        }

        const res = await updateMenuDetail([
          {
            ...menuDetail,
            ...(formValues as TMenuObject),
            labelName: values.i18nLabelNameJson.zh_cn,
            param: JSON.stringify(paramJson),
          },
        ]);
        if (res.data.code === 200) {
          message.success('编辑成功');
          onCloseDialog();
        } else {
          message.error(`编辑失败 ${res.data.msg}`);
        }
        setConfirmLoading(false);
      }
    } catch (error) {
      console.error('error', error);
      setConfirmLoading(false);
    }
  }
  useEffect(() => {
    init();
  }, []);
  async function onConfirm() {
    await form
      .validateFields()
      .then(async (values) => {
        sumbitForm(values);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  useEffect(() => {
    if (labelType == 'menu') {
      form.setFieldsValue({
        ...menuComponentMenu,
      });
    }
  }, [form, labelType]);

  function onCancel() {
    onCloseDialog();
  }
  return (
    <div>
      <Form
        form={form}
        style={{
          marginBottom: 10,
        }}
        initialValues={{
          disabled: false,
        }}
      >
        <Form.Item
          label="类型"
          name="labelType"
          rules={addChildFormRule.labelType}
        >
          <Select options={labelTypeOptions} />
        </Form.Item>
        <Form.Item label="名称">
          {/* 多国语言配置name */}

          {languagesDict &&
            languagesDict.map((item) => {
              return (
                <Form.Item
                  key={item.languageCode}
                  label={item.languageName}
                  name={['i18nLabelNameJson', item.languageCode]}
                  rules={
                    item.languageCode == 'zh_cn'
                      ? [
                          {
                            required: true,
                            message: `请输入${item.languageName}`,
                          },
                        ]
                      : []
                  }
                >
                  <Input />
                </Form.Item>
              );
            })}
        </Form.Item>
        {labelType == 'bottomPageNav' && (
          <Form.Item
            label="选择跳转的页面"
            name="relatedTopMenuId"
            rules={addChildFormRule.relatedTopMenuId}
          >
            <Select options={bottomNavPageOptions} />
          </Form.Item>
        )}
        <Form.Item
          label="是否隐藏"
          name="disabled"
          rules={addChildFormRule.disabled}
        >
          <Radio.Group>
            <Radio value={true}> 是 </Radio>
            <Radio value={false}> 否 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="排序" name="sort" rules={addChildFormRule.sort}>
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button
              style={{
                marginRight: 10,
              }}
              onClick={onCancel}
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
