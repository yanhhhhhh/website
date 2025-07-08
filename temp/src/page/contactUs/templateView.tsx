import Styles from './view.module.less';

// import FormView from './components/formView';
import TemplateRender from '@/components/templateRender';
import ServiceCenter from './components/serviceCenter';

const ContactUs = () => {
  const p2 = <ServiceCenter key="ServiceCenter" />;
  return (
    <div className={Styles.contactUs}>
      <TemplateRender
        labelName="联系我们"
        filledComponent={{
          2: p2,
        }}
      />
    </div>
  );
};

export default ContactUs;
