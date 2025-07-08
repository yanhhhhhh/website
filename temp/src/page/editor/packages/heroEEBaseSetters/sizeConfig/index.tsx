import { FC, useEffect, useMemo } from 'react';

import './index.less';
import { Form, InputNumber, Select, Space } from 'antd';

import { TPlatform, TSizeUnit } from '@/pages/editor/type';
import { PlatformTip } from '../../components/platformText';
import { widthSizeUnit, heightSizeUnit } from '@/pages/editor/constant';
interface SelectAfterProps {
  value: TSizeUnit;
  onUnitChange: (value: TSizeUnit) => void;
  options: { label: TSizeUnit; value: TSizeUnit }[];
}
const SelectAfter: FC<SelectAfterProps> = ({
  value,
  onUnitChange,
  options,
}) => {
  return (
    <Select
      value={value}
      onChange={onUnitChange}
      style={{ width: 80 }}
      options={options}
    />
  );
};
interface SizeConfigProps {
  title: string;
  platform: TPlatform;
  widthUnit: TSizeUnit;
  heightUnit: TSizeUnit;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  onSizeUnitChange: (value: {
    widthUnit: TSizeUnit;
    heightUnit: TSizeUnit;
  }) => void;
  onSizeChange: (value: { width: number; height: number }) => void;
}

export const SizeConfig: FC<SizeConfigProps> = (props) => {
  const {
    title,

    maxWidth,
    width,
    height,
    maxHeight,
    widthUnit,
    heightUnit,
    onSizeUnitChange,
    onSizeChange,
    platform,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      width,
      height,
    });
  }, [width, height, form]);

  const onValuesChange = async () => {
    await form.validateFields().then(() => {
      const res = form.getFieldsValue();

      onSizeChange(res);
    });
  };
  const onWidthUnitChange = (value: TSizeUnit) => {
    onSizeUnitChange({ widthUnit: value, heightUnit });
  };
  const onHeightUnitChange = (value: TSizeUnit) => {
    onSizeUnitChange({ widthUnit, heightUnit: value });
  };
  return (
    <div className="hero-size-config">
      <div className="hero-size-config__title">{title}</div>
      <div>
        <PlatformTip platform={platform} />
      </div>
      <div className="hero-size-config__content">
        <Form form={form} onValuesChange={onValuesChange}>
          <Form.Item label="宽度">
            <Space>
              <Form.Item
                name="width"
                noStyle
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请输入宽度',
                  },
                  {
                    validator: (rule, value) => {
                      if (widthUnit === 'vw' && value > 100) {
                        return Promise.reject(`宽度不能大于100vw`);
                      } else if (value > maxWidth) {
                        return Promise.reject(
                          `宽度不能大于${maxWidth}${widthUnit}`
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  placeholder="宽度"
                  controls={false}
                  // addonAfter={
                  //   <SelectAfter
                  //     value={widthUnit}
                  //     onUnitChange={onWidthUnitChange}
                  //     options={widthSizeUnit}
                  //   />
                  // }
                />
              </Form.Item>

              <span className="tip">
                尺寸要求：最大
                {widthUnit === 'vw' ? '100vw' : maxWidth + widthUnit}
              </span>
            </Space>
          </Form.Item>
          <Form.Item label="高度">
            <Space>
              <Form.Item
                name="height"
                noStyle
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请输入高度',
                  },
                  {
                    validator: (rule, value) => {
                      if (heightUnit === 'vh' && value > 100) {
                        return Promise.reject(`高度不能大于100vh`);
                      } else if (value > maxHeight) {
                        return Promise.reject(`高度不能大于${maxHeight}`);
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  placeholder="高度"
                  controls={false}
                  // addonAfter={
                  // <SelectAfter
                  //   value={heightUnit}
                  //   onUnitChange={onHeightUnitChange}
                  //   options={heightSizeUnit}
                  // />
                  // }
                />
              </Form.Item>
              <span className="tip">
                尺寸要求：最大
                {heightUnit === 'vh' ? '100vh' : maxHeight + heightUnit}
              </span>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SizeConfig;
