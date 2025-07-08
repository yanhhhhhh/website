import { getInternationalizationDict, Language } from '@/api/i18n';
import { message } from '@/providers';
import { useEffect, useState } from 'react';

import {
  addMenuDetail,
  TAddMenuForm,
  TAddMenuObject,
  TMenuObject,
  updateMenuDetail,
} from '@/api/menuManage';
import { customPageList, ICustomPage } from '@/router/module/custom';
import { Button, Flex, Form, Input, InputNumber, Radio, Select } from 'antd';
import { addChildFormRule } from '../../contants/addChildForm';

import { TFile } from '@/api/file';
import { ImageUpload } from '@/pages/editor/packages/heroEEBaseSetters';
import { PlusOutlined } from '@ant-design/icons';
import { AddChildDialogContentParms } from '../../hooks/useChildModal';
import { customCardComponentList } from '@/pages/module/exportComponent';
import { BaseOptionType } from 'antd/es/select';
import {
  cardTypeOptions,
  menuTypeOptions,
  pageTypeOptions,
} from '../labelType';
import { TLabelType } from '@/api/label';

export interface AddChildDialogContentProps extends AddChildDialogContentParms {
  type: 'Add' | 'Edit';

  onCloseDialog: () => void;
}
//页面管理配置的页面

const menuComponentMenu = {
  isCustom: false,
  isLink: false,
  linkUrl: '',
  selectPage: undefined,
  router: '',
  component: '',
  routerCode: '',
};
const cardComponentMenu = {
  component: '',
  router: '', //路由地址
  isCustom: false,
  isLink: false,
};
const pageList = customPageList.map((item) => {
  return {
    ...item,
    label: item.label,
    value: item.key,
  };
});
export const AddChildDialogContent = (props: AddChildDialogContentProps) => {
  const { record, menuDetail, type, onCloseDialog, labelLevel } = props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [languagesDict, setLanguagesDict] = useState<Language[]>();
  const [labelTypeOptions, setLabelTypeOptions] = useState<BaseOptionType[]>(
    []
  );
  const [imageOss, setImageOss] = useState<TFile>();
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
      setImageOss(json.imageOss);
      const { selectPage, selectCardComponent } = json;

      form.setFieldsValue({
        selectPage,
        selectCardComponent,
      });
    }
  };
  const init = async () => {
    await getI18nDict();
    initLabelTypeOptions();
    initForm();
  };
  function initLabelTypeOptions() {
    if (labelLevel == 1) {
      setLabelTypeOptions(menuTypeOptions);
      return;
    }
    if (labelLevel == 2) {
      setLabelTypeOptions(pageTypeOptions);
      return;
    }
    if (labelLevel == 3) {
      setLabelTypeOptions(cardTypeOptions);
      return;
    }
  }
  function initForm() {
    form.resetFields();
    setImageOss(undefined);
    if (type === 'Edit' && menuDetail) {
      getParam();
      form.setFieldsValue({
        ...menuDetail,
      });
      return;
    }
  }
  async function sumbitForm(values: any) {
    const { selectPage, selectCardComponent, ...formValues } = values;

    try {
      setConfirmLoading(true);
      if (type === 'Add') {
        const param = {
          imageOss,

          selectCardComponent,
          selectPage,
        };
        let addParams = {
          param: JSON.stringify(param),
        } as TAddMenuObject;

        // 一级菜单
        if (menuDetail === undefined) {
          addParams = {
            ...(formValues as TAddMenuForm),
            ...addParams,
            labelName: formValues.i18nLabelNameJson.zh_cn,
            labelTemplateId: record.id,
            labelSource: record.labelSource,
            parentId: '0',
            labelLevel: labelLevel,
          };
        } else {
          // 二级菜单和卡片
          addParams = {
            ...(formValues as TAddMenuForm),
            ...addParams,
            labelTemplateId: menuDetail.labelTemplateId,
            labelSource: menuDetail.labelSource,
            parentId: menuDetail.id,
            labelLevel: labelLevel,
            labelName: values.i18nLabelNameJson.zh_cn,
          };
          if (labelLevel == 3) {
            addParams = {
              ...addParams,
              ...cardComponentMenu,
            };
          }
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
        if (menuDetail.param) {
          paramJson = JSON.parse(menuDetail.param);
        }
        paramJson.imageOss = imageOss;

        paramJson.selectPage = selectPage;
        paramJson.selectCardComponent = selectCardComponent;
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
          message.error(`编辑失败  ${res.data.msg}`);
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
  function onSelect(_: string, option: ICustomPage) {
    form.setFieldsValue({
      router: option.path,
      component: option.component,
      routerCode: option.key,
    });
  }

  const isLink = Form.useWatch('isLink', form);

  const labelType = Form.useWatch('labelType', form) as TLabelType;
  // isCustom,isLink 更新时重置 参数
  useEffect(() => {
    if (labelType === 'menu') {
      form.setFieldsValue({
        ...menuComponentMenu,
      });
    }
    if (isLink) {
      form.setFieldsValue({
        linkUrl: '',
        selectPage: undefined,
        router: '',
        component: '',
        routerCode: '',
      });
    }
    if (!isLink) {
      form.setFieldsValue({
        linkUrl: '',
      });
    }
  }, [form, isLink, labelType]);

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
          isCustom: false,
          disabled: false,
          isLink: false,
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

        {labelType !== 'menu' && (
          <>
            {labelType === 'customPage' && labelLevel !== 3 && (
              <Form.Item>
                <Form.Item
                  label="是否是链接"
                  name="isLink"
                  rules={addChildFormRule.isLink}
                >
                  <Radio.Group>
                    <Radio value={true}> 是 </Radio>
                    <Radio value={false}> 否 </Radio>
                  </Radio.Group>
                </Form.Item>
                {isLink ? (
                  <Form.Item
                    label="链接地址"
                    name="linkUrl"
                    rules={addChildFormRule.link}
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  <Form.Item>
                    <Form.Item
                      label="选择自定义页面"
                      name="selectPage"
                      rules={addChildFormRule.selectPage}
                    >
                      <Select options={pageList} onSelect={onSelect} />
                    </Form.Item>

                    <Form.Item label="路由路径" name="router">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="组件位置" name="component">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="路由编码" name="routerCode">
                      <Input disabled />
                    </Form.Item>
                  </Form.Item>
                )}
              </Form.Item>
            )}
            {/* 自定义卡片组件 */}
            {labelType === 'customCard' && labelLevel == 3 && (
              <Form.Item>
                <Form.Item
                  label="选择自定义组件"
                  name="selectCardComponent"
                  rules={addChildFormRule.selectPage}
                >
                  <Select options={customCardComponentList} />
                </Form.Item>
              </Form.Item>
            )}
          </>
        )}
        {labelType === 'configPage' && (
          <Form.Item
            label="路由编码"
            name="routerCode"
            rules={addChildFormRule.routerCode}
          >
            <Input />
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
        {labelLevel == 2 && (
          <Flex>
            <div>图片：</div>

            <ImageUpload
              cropSize={{
                width: 8,
                height: 11,
              }}
              isLimitCropSize={true}
              limitSize={10}
              uploadOssPath={'menu-manage/'}
              ossFile={imageOss}
              onImageChange={(value) => {
                setImageOss(value);
              }}
              uploadButton={
                <PlusOutlined
                  style={{
                    color: '#1761ff',
                  }}
                />
              }
            />
          </Flex>
        )}
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
