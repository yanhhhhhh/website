import { Icon } from '@/components';
import { baseConfig } from '@/stores';
import { Modal } from 'antd';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/contact.less';
import { globalEmail } from '@/constants';
export function useContact() {
  const { device } = useAtomValue(baseConfig);
  const { t } = useTranslation();
  return () =>
    Modal.info({
      title: null,
      centered: true,
      maskClosable: true,
      className: 'contact-modal',
      icon: null,
      closable: device.isPc,
      footer: null,

      closeIcon: device.isPc ? (
        <Icon
          name="image-close"
          style={{
            width: '0.36rem',
            height: '0.36rem',
          }}
        ></Icon>
      ) : null,

      content: (
        <div
          style={{
            textAlign: 'center',

            padding: device.isPc ? '0 0.8rem' : '0',
            margin: device.isPc ? '0 auto' : '0 auto',
          }}
        >
          <h3 style={{ fontSize: '0.24rem', marginBottom: '0.2rem' }}>
            {t('contact.comingSoon')}
          </h3>
          <a
            href={`mailto:${globalEmail}`}
            style={{
              whiteSpace: 'nowrap',
              fontSize: device.isPc ? '0.22rem' : '0.2rem',
            }}
          >
            {t('contact.emailTo')}：{globalEmail}
          </a>

          <Icon
            name="image-mobile-close"
            style={{
              position: 'absolute',
              bottom: '-0.66rem',
              zIndex: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0.6rem',
              height: '0.6rem',
              textAlign: 'right',
              display: device.isPc ? 'none' : 'block',
            }}
            onClick={() => {
              Modal.destroyAll();
            }}
          ></Icon>
        </div>
      ),

      okButtonProps: {
        style: {
          display: 'none',
        },
      },
    });
}
