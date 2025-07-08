import { Button } from 'antd';

import { useTranslation } from 'react-i18next';
import './index.less';
import QRCode from '@/assets/images/support/QR-code.webp';
import { feishuFeedbackUrl } from '@/pages/chatbot/constant';

function openUrl() {
  window.open(feishuFeedbackUrl, '_blank');
}
const SupportContact = () => {
  const { t } = useTranslation();
  return (
    <div className="support-contact">
      <div className="desc">{t('support.contact')}</div>
      <Button className="button" type="primary" onClick={openUrl}>
        {t('support.feedback')}
      </Button>
      <div>
        <img className="QR-code" src={QRCode} alt="QR code" />
      </div>
      <div className="tip">{t('cooperation.scanQRCode')}</div>
    </div>
  );
};

export default SupportContact;
