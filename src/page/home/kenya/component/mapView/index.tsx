import mapImage from '@/assets/images/kenyaHome/1.png';
import mapMobileImage from '@/assets/images/kenyaHome/mobile/1.png';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import './index.less';
import { kenyaDistributorContacts } from '@/constants';

import { message } from '@/providers';
import { useWebsiteLinkTrack } from '@/hooks';

export function MapView() {
  const { device } = useAtomValue(baseConfig);
  const { phoneTrack } = useWebsiteLinkTrack();
  function onPhoneCall(phoneNumber: string) {
    phoneTrack(phoneNumber);
    window.location.href = `tel:${phoneNumber}`;
  }
  function onCopy(text: string) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    message.success('Copy Success');
  }
  return (
    <div
      className="kenya-map-view"
      style={{
        backgroundImage: `url(${device.isPc ? mapImage : mapMobileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="kenya-contact-table">
        <table cellSpacing={0} cellPadding={0}>
          <caption>Kenya Distributor Contacts</caption>
          <thead>
            <tr>
              <th>HShop Name</th>
              <th>Contact Persone</th>
              <th>Phone Number</th>
              <th>County</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {kenyaDistributorContacts.map((item) => {
              return (
                <tr key={item.phoneNumber}>
                  <td onClick={() => onCopy(item.shopName)}>{item.shopName}</td>
                  <td>{item.contactPerson}</td>
                  <td onClick={() => onPhoneCall(item.phoneNumber)}>
                    {item.phoneNumber}
                  </td>
                  <td>{item.county}</td>
                  <td onClick={() => onCopy(item.address)}>{item.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MapView;
