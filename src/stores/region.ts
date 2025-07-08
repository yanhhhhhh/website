import { Region, RegionCountry } from '@/constants';

import { atom } from 'jotai';

export const isShowRegion = atom(false);
export const regionListAtom = atom<Region[]>([]);
export const allCountryAtom = atom<RegionCountry[]>((get) => {
  const regionList = get(regionListAtom);
  const countryList: RegionCountry[] = [];
  regionList.forEach((region) => {
    countryList.push(...region.countries);
  });
  return countryList;
});
