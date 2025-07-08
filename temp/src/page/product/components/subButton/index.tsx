import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Styles from './view.module.less';

interface Props {
  url?: string;
}

const SubButton = ({ url = '/services_subscriptions' }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button className={Styles.subBtn} onClick={() => navigate(url)}>
      {t('contact.contactUs')}
    </Button>
  );
};

export default SubButton;
