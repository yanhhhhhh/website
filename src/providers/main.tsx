import { baseConfig, ELang } from '@/stores';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider, Spin } from 'antd';
import { useAtomValue } from 'jotai';

import AntdEnUs from 'antd/es/locale/en_US';

import AntdZhCN from 'antd/es/locale/zh_CN';

import 'dayjs/locale/zh-cn';

import { FC, PropsWithChildren, ReactElement, Suspense, useMemo } from 'react';

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

// 添加前缀类，用于自定义静态方法的颜色
ConfigProvider.config({
  prefixCls: 'hero',
});

export interface AntdStaticMethodProps extends PropsWithChildren {}

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

const AntdStaticMethodProvider: FC<AntdStaticMethodProps> = (props) => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return <>{props.children}</>;
};

export { message, modal, notification };

export default function Providers(props: { children: ReactElement }) {
  const base = useAtomValue(baseConfig);

  const locale = useMemo(() => {
    const lang = base.language;
    switch (lang) {
      case ELang.chinese:
        return AntdZhCN;
      case ELang.english:
        return AntdEnUs;
      default:
        return AntdEnUs;
    }
  }, [base.language]);

  const px2rem = px2remTransformer({
    rootValue: 100, // 32px = 1rem; @default 16
  });

  return (
    <StyleProvider
      hashPriority="high"
      // transformers={[px2rem]}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3866F7',
            colorSuccess: '#0ed180',
            colorWarning: '#ffa623',
            colorError: '#ff425c',
            fontFamily: `"SourceHanSansCN", -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'`,
            // colorBgBase: "#080808",
            controlOutlineWidth: 0,
            // fontSize: undefined,
          },
          components: {
            Button: {
              // padding: 0,
            },
            Select: {
              optionSelectedColor: '#1761ff',
            },
          },
        }}
        locale={locale}
        prefixCls="hero"
      >
        <App>
          <AntdStaticMethodProvider>
            <Suspense fallback={<Spin />}>{props.children}</Suspense>
          </AntdStaticMethodProvider>
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
}
