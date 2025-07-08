import { contactUsCountry } from '@/constants';
import { useCallback, useState, useMemo } from 'react';

const useMixins = () => {
  const [countryCode, setCountryCode] = useState<string>('CN');

  const onAreaClick = useCallback((item: (typeof contactUsCountry)[0]) => {
    setCountryCode(item.countryCode);
  }, []);

  const currentCountry = useMemo(() => {
    const c = contactUsCountry.find((ele) => ele.countryCode == countryCode);
    return c;
  }, [countryCode]);

  return {
    countryCode,
    setCountryCode,
    onAreaClick,
    currentCountry,
  };
};

export default useMixins;
