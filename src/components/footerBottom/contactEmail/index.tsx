import { contactUsList } from '@/constants';
import { useWebsiteLinkTrack } from '@/hooks';
import { useTranslation } from 'react-i18next';
import './index.less';
const ContactEmail = () => {
  const { emailTrack } = useWebsiteLinkTrack();
  const { t } = useTranslation();

  return (
    <div className="footer-contactUs-container ">
      {contactUsList.map((item, index) => (
        <div key={index} className="contactUs-row">
          <div className="left">
            <div className="name">{t(item.name)}</div>
            <a
              className="email"
              href={`mailto:${item.email}`}
              onClick={() => emailTrack(item.email)}
            >
              {item.email}
            </a>
          </div>
          <img className="right" src={item.img}></img>
        </div>
      ))}
    </div>
  );
};

export default ContactEmail;
