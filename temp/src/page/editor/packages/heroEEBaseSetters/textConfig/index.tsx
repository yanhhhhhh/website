import {
  Button,
  ColorPicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';

import { I18nObject, getI18nObjectByCode } from '@/api/i18n';
import { useI18n } from '@/pages/editor/hooks/useI18n';
import { TI18nConfig, TPlatform } from '@/pages/editor/type';
import { EditOutlined } from '@ant-design/icons';
import { set } from 'es-toolkit/compat';
import { FC, useEffect, useState } from 'react';
import { TTextConfig } from '../../heroEEComponents/heroEEImage/defaultSetter';
import {
  fontWeights,
  internalLink,
  textPositionOptions,
  textTypeOptions,
  textWrapOptions,
} from './defaultSetter';
import './index.less';
import { useTextModal } from './useTextModal';
const inputNumberProps = {
  style: {
    width: '100%',
  },
  controls: false,
};
interface TextConfigProps {
  textConfig: TTextConfig;
  // i18n?: TI18nConfig;
  // textStyle?: TStyleConfig;
  platform: TPlatform;
  // onI18nChange?: (i18n: TI18nConfig) => void;
  // onTextStyleChange?: (textStyle: TStyleConfig) => void;
  onTextConfigChange: (textConfig: TTextConfig) => void;
  onI18nChangeCallback?: (i18n: I18nObject) => void;
}
export const TextConfig: FC<TextConfigProps> = (props) => {
  const { textConfig, platform, onTextConfigChange, onI18nChangeCallback } =
    props;
  const [form] = Form.useForm();
  const { languagesDict } = useI18n();

  const [i18nRecord, setI18nRecord] = useState<I18nObject>();

  const { openModal } = useTextModal();
  const addI18NModal = () => {
    openModal('Add', {
      onChangeI18nData,
      onUpdateLanguageLists: getI18n,
    });
  };
  const editI18NModal = () => {
    openModal('Edit', {
      record: i18nRecord,
      onChangeI18nData,
      onUpdateLanguageLists: getI18n,
    });
  };
  const textType = Form.useWatch('type', form);
  const horizontalTextPosition = Form.useWatch(
    [platform, 'horizontalTextPosition'],
    form
  );
  const verticalTextPosition = Form.useWatch(
    [platform, 'verticalTextPosition'],
    form
  );

  const onValuesChange = async () => {
    await form
      .validateFields()
      .then(() => {
        const res = form.getFieldsValue();
        const color = res[platform].color;
        res[platform].color =
          typeof color === 'string' ? color : color?.toHexString();

        onTextConfigChange({
          ...textConfig,
          ...res,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onChangeI18nData = (data: TI18nConfig) => {
    const newConfig = set<TTextConfig>(textConfig, 'i18n', data);

    onTextConfigChange(newConfig);
  };

  const getI18n = async (code: string) => {
    if (!code) return;
    getI18nObjectByCode(code).then((res) => {
      setI18nRecord(res);

      onI18nChangeCallback?.(res);
    });
  };

  useEffect(() => {
    if (textConfig) {
      form.setFieldsValue(textConfig);
    }
  }, [form, textConfig]);
  useEffect(() => {
    if (!textConfig.i18n.code) return;
    getI18n(textConfig.i18n.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textConfig.i18n.code]);

  return (
    <div className="hero-text-config">
      <Form
        form={form}
        wrapperCol={{ span: 12 }}
        labelCol={{ span: 6 }}
        onValuesChange={onValuesChange}
        validateTrigger="onBlur"
        initialValues={{
          color: textConfig[platform].color,
        }}
      >
        <Form.Item label="文案类型" name="type">
          <Select options={textTypeOptions}></Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 12,
          }}
        >
          {i18nRecord ? (
            <div className="hero-text-i18n-list">
              {languagesDict.map((item) => {
                return (
                  <div key={item.languageCode}>
                    <Flex justify="space-between">
                      <div>
                        {item.languageName}:
                        {i18nRecord?.[item.languageCode as keyof I18nObject]}
                      </div>
                      <EditOutlined
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={editI18NModal}
                      />
                    </Flex>
                  </div>
                );
              })}
            </div>
          ) : (
            <Button type="primary" onClick={addI18NModal}>
              新增I18N文案
            </Button>
          )}
        </Form.Item>

        {textType === 'externalLink' && (
          <Form.Item
            label="外部链接"
            name="externalLink"
            // 校验链接url
            rules={[
              {
                type: 'url',
                message: '链接格式不正确',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {textType === 'internalLink' && (
          <Form.Item label="内部链接" name="internalLink">
            <Select options={internalLink}></Select>
          </Form.Item>
        )}
        <Form.Item>
          <h3>{platform}字体配置</h3>
        </Form.Item>
        <Form.Item
          label="水平文案位置"
          name={[platform, 'horizontalTextPosition']}
          rules={[
            {
              required: true,
              message: '请选择文案位置',
            },
          ]}
        >
          <Select options={textPositionOptions}></Select>
        </Form.Item>
        {horizontalTextPosition === 'custom' && (
          <>
            <Form.Item
              name={[platform, 'left']}
              label="距离左侧"
              validateTrigger="onBlur"
            >
              <InputNumber {...inputNumberProps} />
            </Form.Item>
            <Form.Item
              name={[platform, 'right']}
              label="距离右侧"
              validateTrigger="onBlur"
            >
              <InputNumber {...inputNumberProps} />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="垂直文案位置"
          name={[platform, 'verticalTextPosition']}
          rules={[
            {
              required: true,
              message: '请选择文案位置',
            },
          ]}
        >
          <Select options={textPositionOptions}></Select>
        </Form.Item>

        {verticalTextPosition === 'custom' && (
          <>
            <Form.Item
              name={[platform, 'top']}
              label="距离顶部"
              validateTrigger="onBlur"
            >
              <InputNumber {...inputNumberProps} />
            </Form.Item>
            <Form.Item
              name={[platform, 'bottom']}
              label="距离底部"
              validateTrigger="onBlur"
            >
              <InputNumber {...inputNumberProps} />
            </Form.Item>
          </>
        )}
        <Form.Item
          name={[platform, 'textWrap']}
          label="文本换行"
          validateTrigger="onBlur"
        >
          <Select options={textWrapOptions}></Select>
        </Form.Item>
        <Form.Item
          name={[platform, 'fontSize']}
          label="字号"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: '请输入字体大小',
            },
          ]}
        >
          <InputNumber {...inputNumberProps} />
        </Form.Item>
        <Form.Item
          name={[platform, 'fontWeight']}
          label="粗细"
          rules={[
            {
              required: true,
              message: '请选择字体粗细',
            },
          ]}
        >
          <Select options={fontWeights}></Select>
        </Form.Item>
        <Form.Item name={[platform, 'color']} label="颜色">
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </div>
  );
};
