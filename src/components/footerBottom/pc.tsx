import { other } from '@/constants';
import { useLocale, useWebsiteLinkTrack } from '@/hooks';
import { useAgreement } from '@/hooks/useAgreement';
import { useCustomization } from '@/hooks/useCustomization';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';
import { Icon } from '..';
import LanguageSwitch from '../languageSwitch';
import { goCnMps, goCopyRight } from './tools';
import './view.less';

const PcFooter = () => {
  const t = useTranslations();
  const { customPcFooterNav, customServiceHotline, customEmail } =
    useCustomization();
  const {
    navigateTo,
    thirdLinksAndOther,

    getPath,
  } = useLocale();
  const { goToAgreementPage } = useAgreement();
  const goTo = (url?: string) => {
    if (url) {
      if (url.includes('agreement')) {
        goToAgreementPage(url);

        // window.open(path, '_blank', 'noopener noreferrer');
        return;
      }
      navigateTo(url);
    }
  };
  const { emailTrack, thirdLinksTrack, phoneTrack } = useWebsiteLinkTrack();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="list">
          <Flex className="list-left">
            {customPcFooterNav.map((item) => (
              <Flex vertical className="list-left-column" key={item.name}>
                <h3 className="title">{`${t(item.name)}`}</h3>
                {item.children.map((child) =>
                  child.type === 'anchor' ? (
                    <a
                      className="list-item"
                      href={`${import.meta.env.VITE_ROUTER_BASE}${getPath(
                        child.to
                      )}`}
                      key={child.name}
                    >{`${t(child.name)}`}</a>
                  ) : (
                    <p
                      className="list-item"
                      key={child.name}
                      onClick={() => goTo(child.to)}
                    >
                      {`${t(child.name)}`}
                    </p>
                  )
                )}
              </Flex>
            ))}
          </Flex>
          <div className="service-hot-line">
            <h3 className="title">{`${t(other.serviceHotLine)}`}</h3>
            <p
              className="hot-line"
              onClick={() => phoneTrack(customServiceHotline)}
            >
              {customServiceHotline}
            </p>
            <div className="hot-svgs">
              {thirdLinksAndOther.map((item, index) => (
                <img
                  key={index}
                  src={item.icon}
                  alt={item.to}
                  className="hot-icon"
                  onClick={() => {
                    thirdLinksTrack(item);
                    window.open(item.to, '_blank');
                  }}
                />
              ))}
            </div>
            <div className="email">
              <div className="input">
                <Icon name="email" color="#fff" className="email-icon"></Icon>
                <a
                  onClick={() => emailTrack(customEmail)}
                  href={`mailto:${customEmail}`}
                >
                  {customEmail}
                </a>
              </div>
            </div>
            {/* <Flex align="center">
              <input
                placeholder={`${t(other.emailPlaceholder)}`}
                className="input"
              />
              <div className="hot-email-wrap">
                <img src={other.email.icon} alt="" className="hot-email" />
              </div>
            </Flex>
            <Checkbox onChange={onChange} className="checkbox">
              {`${t(other.serviceTip)}`}
            </Checkbox> */}
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <Flex justify="space-between" align="center" className="copyright">
          {/* <span className="text">{t(enterpriseInfo.copyright)}</span>{' '} */}
          <p>
            <span
              style={{
                marginRight: '0.4rem',
              }}
            >
              版权所有©深圳海辰平权英雄能源科技有限公司
            </span>
            <span className="text" onClick={goCnMps}>
              粤公网安备44030002004256号
            </span>
            <span className="text" onClick={goCopyRight}>
              粤ICP备2024274286号-1
            </span>
          </p>
          <LanguageSwitch position="footer" />
        </Flex>
      </div>
    </footer>
  );
};

export default PcFooter;
