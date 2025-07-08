import { useLocale } from '@/hooks';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

const NoMatch = () => {
  const { t } = useTranslation();
  const { navigateTo } = useLocale();
  const goHome = () => {
    navigateTo('/');
  };

  return (
    <>
      <Result
        status="404"
        title="404"
        // subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            {t('case.back')}
          </Button>
        }
      />
    </>
  );
};

export default NoMatch;
