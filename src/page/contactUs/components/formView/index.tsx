import { CountryInfo, getCountList, saveUpdateConsult } from '@/api/consult';
import { consultType } from '@/constants';

import { modal } from '@/providers';
import { baseConfig } from '@/stores';
import { getRegValidRes, reg } from '@/utils';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { Rule } from 'antd/es/form';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';
import './modal.less';
import { useAgreement } from '@/hooks/useAgreement';

const { Option } = Select;

const FormView = () => {
  const { t } = useTranslation();

  const [base] = useAtom(baseConfig);

  const [form] = Form.useForm();

  const [areaCodeList, setAreaCodeList] = useState<CountryInfo[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);

  const [submittable, setSubmittable] = useState<boolean>(false);
  const { goToAgreementPage } = useAgreement();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  useEffect(() => {
    getCountList().then((res) => {
      const { data } = res;
      if (data.code === 200) {
        setAreaCodeList(data.data);
      }
    });

    // form.setFieldsValue({
    //   areaCode: '86',
    //   areaName: '广州',
    //   consultType: 'SERVICE',
    //   consultText: '价格？？？',
    //   consultantFirstName: '名',
    //   consultantLastName: '姓',
    //   email: '1222222@qq.com',
    //   phone: '1355555555'
    // });
  }, []);
  const prefixSelector = useMemo(
    () => (
      <Form.Item name="phoneAreaCode" noStyle initialValue={'86'}>
        <Select style={{ width: 80 }}>
          {areaCodeList.map((item) => (
            <Option key={item.areaCode} value={item.areaCode}>
              +{item.areaCode}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),
    [areaCodeList]
  );
  const formRules = useMemo<Record<string, Rule[]>>(() => {
    return {
      areaName: [
        {
          type: 'string',
          max: 200,
          message: t('contactPage.consultTextLengthLimit'),
        },
      ],
      consultantFirstName: [
        {
          type: 'string',
          max: 200,
          message: t('contactPage.consultTextLengthLimit'),
        },
      ],
      consultantLastName: [
        {
          type: 'string',
          max: 200,
          message: t('contactPage.consultTextLengthLimit'),
        },
      ],
      phone: [
        {
          validator(_, value) {
            const val = value?.trim();
            if (val) {
              const allNumFlag = getRegValidRes(val, reg.allNum);
              if (!allNumFlag) {
                const errText0 = t('contactPage.enterValidPhoneTip');
                return Promise.reject(errText0);
              }
              if (val.length > 11) {
                const errText1 = t('contactPage.phoneNumberLengthLimitTip');
                return Promise.reject(errText1);
              }
            }

            return Promise.resolve();
          },
        },
        {
          required: true,
          message: t('contactPage.enterPhoneNumberTip'),
        },
      ],
      email: [
        {
          type: 'email',
          message: t('contactPage.enterValidEmailTip'),
        },
        {
          required: true,
          message: t('contactPage.enterEmailTip'),
        },
      ],
      agreement: [
        {
          validator: (_, value) => {
            if (value) {
              return Promise.resolve();
            } else {
              return Promise.reject(new Error('Should accept agreement'));
            }
          },
        },
      ],
      consultText: [
        {
          type: 'string',
          max: 200,
          message: t('contactPage.enterValidConsultTextTip'),
        },
      ],
      consultType: [
        {
          required: true,
          message: t('contactPage.selectConsultType'),
        },
      ],
    };
  }, []);
  const openModal = ({
    type,
    text,
  }: {
    type: 'success' | 'error' | 'info';
    text: string;
  }) => {
    const instance = modal.info({
      centered: true,
      className: 'contact-us-modal',
      icon: null,
      closable: base.device.isPc,
      content: (
        <div className="contact-us-modal-wrapper">
          <div className="contact-us-modal-icon">
            {type === 'success' && (
              <CheckCircleFilled
                style={{
                  color: '#52c41a',
                }}
              />
            )}

            {type === 'error' && (
              <CloseCircleFilled
                style={{
                  color: '#f5222d',
                }}
              />
            )}
            {type === 'info' && <></>}
          </div>
          <h2 className="contact-us-modal-text"> {text}</h2>
        </div>
      ),
      okText: t('button.confirm'),
    });
    return instance;
  };
  const onSubClick = useCallback(async () => {
    setLoadingFlag(true);
    form
      .validateFields()
      .then((values) => {
        values.phoneAreaCode = '+' + values.phoneAreaCode;
        delete values.agreement;

        saveUpdateConsult(values).then((res) => {
          setLoadingFlag(false);
          if (res.data.code == 200) {
            const instance = openModal({
              type: 'success',
              text: t('contactPage.submitSuccess'),
            });
            if (base.device.isMobile) {
              setTimeout(() => {
                instance.destroy();
              }, 1000);
            }

            form.resetFields();
          } else {
            const instance = openModal({
              type: 'error',
              text: t('contactPage.submitFailed'),
            });
            if (base.device.isMobile) {
              setTimeout(() => {
                instance.destroy();
              }, 1000);
            }
          }
        });
      })
      .catch((err) => {
        if (err.errorFields.length > 0) {
          const { name } = err.errorFields[0];
          if (name.length > 0 && name.includes('agreement')) {
            const instance = openModal({
              type: 'info',
              text: t('contactPage.checkAgreement'),
            });

            setTimeout(() => {
              instance.destroy();
            }, 1000);
          }
        }

        setLoadingFlag(false);
      });
  }, [base.device]);
  const goToAgreement = useCallback(() => {
    goToAgreementPage('/agreement/privacy');
  }, [goToAgreementPage]);
  return (
    <div className={style['form-view']}>
      <h2 className={style['form-view__title']}>
        {t('contactPage.welcomeToContactHeroEE')}
      </h2>
      <p className={style['form-view___subtitle']}>
        {t('contactPage.letsDiscussHomeAndBusinessSales')}
      </p>
      <Form
        form={form}
        requiredMark={false}
        className={style['consult-form']}
        scrollToFirstError
        onFinish={onSubClick}
      >
        <Form.Item
          name="areaName"
          rules={formRules.areaName}
          className={style['form-item']}
        >
          <Input placeholder={t('contactPage.countryAndRegion')} />
        </Form.Item>

        {base.device.isMobile ? (
          <>
            <Form.Item
              rules={formRules.consultantFirstName}
              name="consultantFirstName"
              className={style['form-item']}
            >
              <Input placeholder={t('contactPage.name')} />
            </Form.Item>
            <Form.Item
              rules={formRules.consultantLastName}
              name="consultantLastName"
              className={style['form-item']}
            >
              <Input placeholder={t('contactPage.surname')} />
            </Form.Item>
          </>
        ) : (
          <Form.Item>
            <Row gutter={8}>
              <Col span={12} className={style['form-item']}>
                <Form.Item
                  noStyle
                  rules={formRules.consultantFirstName}
                  name="consultantFirstName"
                >
                  <Input placeholder={t('contactPage.name')} />
                </Form.Item>
              </Col>
              <Col span={12} className={style['form-item']}>
                <Form.Item
                  noStyle
                  rules={formRules.consultantLastName}
                  name="consultantLastName"
                >
                  <Input placeholder={t('contactPage.surname')} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}
        {base.device.isMobile ? (
          <>
            <Form.Item
              name="email"
              rules={formRules.email}
              className={style['form-item']}
            >
              <Input placeholder={t('contactPage.emailAddress')} />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={formRules.phone}
              className={style['form-item']}
            >
              <Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder={t('contactPage.phoneNumber')}
              />
            </Form.Item>
          </>
        ) : (
          <Form.Item className={style['form-item']}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="email" noStyle rules={formRules.email}>
                  <Input placeholder={t('contactPage.emailAddress')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item noStyle name="phone" rules={formRules.phone}>
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    placeholder={t('contactPage.phoneNumber')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}

        <Form.Item
          name="consultType"
          rules={formRules.consultType}
          className={style['form-item']}
        >
          <Select placeholder={t('contactPage.about')}>
            {consultType.map((item) => (
              <Option key={item.type} value={item.type}>
                {t(item.translation)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="consultText"
          rules={formRules.consultText}
          className={style['form-item']}
        >
          <Input.TextArea
            placeholder={t('contactPage.whatCanWeHelpYouWith')}
            allowClear
            showCount
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          noStyle
          // rules={formRules.agreement}
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error('Should accept agreement'));
                }
              },
            },
          ]}
        >
          <div>
            <Checkbox className={style['form-checked-box']}>
              {t('contactPage.agree')}
            </Checkbox>
            <a onClick={goToAgreement}>
              《{t('contactPage.loginUserPrivacyPolicy')}》
            </a>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style['form-view__subbtn']}
            // onClick={onSubClick}
            disabled={!submittable}
            loading={loadingFlag}
          >
            {t('contactPage.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormView;
