import Banner from '@/components/banner';
import Styles from './view.module.less';
import { contactUsBanner } from '@/constants/contactUs';

// import FormView from './components/formView';
import ServiceCenter from './components/serviceCenter';
const banner = {
  ...contactUsBanner,
  title: contactUsBanner.translation.title,
  description: contactUsBanner.translation.description,
};
const ContactUs = () => {
  return (
    <div className={Styles.contactUs}>
      <Banner {...banner} contentPosition="center" />
      {/* <FormView /> */}
      <ServiceCenter />
    </div>
  );
};

export default ContactUs;
