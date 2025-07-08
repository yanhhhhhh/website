import { Button } from 'antd';

import { useTranslation } from 'react-i18next';
import './partner.less';
import QRCode from '@/assets/images/cooperation/QR-code.webp';
import { cooperationPartnerUrl } from './constant';
function openCooperationPartnerUrl() {
  window.open(cooperationPartnerUrl, '_blank');
}
const Partner = () => {
  const { t } = useTranslation();
  return (
    <div className="cooperation-partner">
      <div className="title">{t('cooperation.becomeHeroEEPartner')}</div>
      <div className="desc">{t('cooperation.contactUsNow')}</div>
      <Button
        className="button"
        type="primary"
        onClick={openCooperationPartnerUrl}
      >
        {t('cooperation.becomePartner')}
      </Button>
      <div>
        <img className="QR-code" src={QRCode} alt="QR code" />
      </div>
      <div className="tip">{t('cooperation.scanQRCode')}</div>
    </div>
  );
};

export default Partner;
