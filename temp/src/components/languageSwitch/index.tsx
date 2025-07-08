import { useAtom, useAtomValue } from 'jotai';
import { Space, Flex } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import { baseConfig, isShowRegion } from '@/stores';
import { useTranslation } from 'react-i18next';

import './index.less';

import { useLocale } from '@/hooks';
import RegionList from '@/components/regionList';

interface Props {
  position?: 'navgatior' | 'footer';
}

const LanguageSwitch = ({ position = 'navgatior' }: Props) => {
  const { t } = useTranslation();
  const base = useAtomValue(baseConfig);
  const { chickLanguageIcon } = useLocale();

  const [isShowRegionValue, setIsShowRegion] = useAtom(isShowRegion);
  const { country, languageName } = base;
  function clickMask() {
    document.body.style.overflowY = 'auto';
    setIsShowRegion(false);
  }

  // useEffect(() => {
  //   changeLanguage(locale);
  // }, [changeLanguage, locale]);

  return (
    <>
      <Flex
        align="center"
        justify="flex-start"
        className={`boxWraper ${position === 'footer' ? 'longBoxWrapper' : ''}`}
        onClick={chickLanguageIcon}
      >
        <Space
          size={'small'}
          direction={base.device.isMobile ? 'vertical' : 'horizontal'}
        >
          {position === 'footer' ? (
            <div className="label">
              <span className="chooseCountry">{t('desc.chooseCountry')}</span>

              {t('sign.colon')}
            </div>
          ) : null}
          <Flex align="center" className="ballWraper">
            <GlobalOutlined
              className="lanIcon"
              // style={
              //   position === 'footer'
              //     ? {
              //         color: '#fff',
              //         fontSize: '0.20rem',
              //       }
              //     : {
              //         color: '#fff',
              //         fontSize: '0.20rem',
              //       }
              // }
            />
            {position === 'footer' ? `${country}  （${languageName}）` : null}
          </Flex>
        </Space>
      </Flex>
      {base.device.isPc && position === 'navgatior' && (
        <>
          <div
            className={`mask ${isShowRegionValue ? 'show' : 'hide'}`}
            onClick={clickMask}
          ></div>
          <div
            className={`pcRegionList ${isShowRegionValue ? 'show' : 'hide'}`}
          >
            <RegionList />
          </div>
        </>
      )}
    </>
  );
};

export default LanguageSwitch;
