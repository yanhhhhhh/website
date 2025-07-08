import contactImage from '@/assets/images/kenyaHome/10.png';
import contactMobileImage from '@/assets/images/kenyaHome/mobile/10.png';
import './index.less';

import { Icon, IconName } from '@/components';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';

import { useWebsiteLinkTrack } from '@/hooks';
interface ContactViewProps {
  contactList: {
    icon: string;
    key: string;
    text: string;
    url?: string;
  }[];
  backgroundImage: string;
  mobileBackgroundImage: string;
}
export function ContactView(props: ContactViewProps) {
  const { contactList, backgroundImage, mobileBackgroundImage } = props;
  const { device } = useAtomValue(baseConfig);
  const { emailTrack, phoneTrack, thirdLinksTrack } = useWebsiteLinkTrack();
  function onClick(item: any) {
    if (item.key === 'titok') {
      thirdLinksTrack({
        icon: '',
        to: item.url,
        type: 'titok',
      });
      window.open(item.url, '_blank');
    }

    if (item.key === 'email') {
      emailTrack(item.text);
      window.location.href = `mailto:${item.text}`;
    }
    if (item.key === 'mobile') {
      phoneTrack(item.text);
      window.location.href = `tel:${item.text}`;
    }
  }
  return (
    <div
      className="hero-contact-view"
      style={{
        backgroundImage: `url(${
          device.isPc ? backgroundImage : mobileBackgroundImage
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-content">
        <div className="title">Get in contact</div>
        {/* 联系 */}
        {contactList.map((item, index) => {
          return (
            <div
              key={index}
              className="contact-item"
              // 属性选择器
              data-type={item.key}
              onClick={() => onClick(item)}
            >
              <div className="icon ">
                <Icon name={item.icon as IconName} color="#ffffff"></Icon>
              </div>
              <div className="text">{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ContactView;
