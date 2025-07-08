import { useParams } from 'react-router-dom';
import AppFunction from './components/appFunction';
import Banner from './components/banner';
import HouseholdEnergy from './components/householdEnergy';
import UserManual from './components/userManual';
import Styles from './view.module.less';
import { useLayoutEffect } from 'react';
import { scrollToElement } from '@/utils/scroll';

const Download = () => {
  const params = useParams() as { type?: string };
  const anchor = params.type;

  useLayoutEffect(() => {
    if (anchor) {
      setTimeout(() => {
        scrollToElement(`HeroEEDownload_${anchor}`);
      }, 0);
    }
  }, [anchor]);
  return (
    <div className={Styles.download}>
      {/* <div id="HeroEEDownload_app">
        <Banner />
      </div>

      <HouseholdEnergy />
      <AppFunction /> */}
      <div id="HeroEEDownload_manual">
        <UserManual />
      </div>
    </div>
  );
};

export default Download;
