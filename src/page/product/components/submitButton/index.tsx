import { useTranslation } from 'react-i18next';

import './index.less';
import { useMemoizedFn } from 'ahooks';
import { useImperativeHandle, useState, forwardRef } from 'react';
import { useContact } from '@/hooks/useContact';

interface SubmitButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  url?: string;
  onSubClick?: () => void;
}
const SubmitButton = forwardRef((props: SubmitButtonProps, ref) => {
  const {
    type = 'primary',
    url = '/services_subscriptions',
    onSubClick,
  } = props;
  const openDialog = useContact();
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const [activeFlag, setActiveFlag] = useState<boolean>(false);

  const onBtnClick = useMemoizedFn(() => {
    setActiveFlag(true);
    if (onSubClick) {
      onSubClick();
      return;
    }
    openDialog();
    // url && navigate(url);
  });

  useImperativeHandle(ref, () => ({
    setActiveFlag,
  }));

  return (
    <button
      className={`submit__button ${type} ${activeFlag ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();

        onBtnClick();
      }}
      // onTouchEnd={(e) => {
      //   e.stopPropagation();
      //   onBtnClick();
      // }}
    >
      {t('contact.contactUs')}
    </button>
  );
});

export default SubmitButton;
