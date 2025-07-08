import { Blackout as HeroEE8kWhDayAndNight } from '../product/HeroEE8kWh/components/blackout';
import { Blackout as HeroEE16kWhDayAndNight } from '../product/HeroEE16kWh/components/blackout';

export const customCardComponentList = [
  {
    label: 'HeroEE8kWh昼夜交替',
    value: 'HeroEE8kWhDayAndNight',
    component: <HeroEE8kWhDayAndNight />,
  },
  {
    label: 'HeroEE16kWh昼夜交替',
    value: 'HeroEE16kWhDayAndNight',
    component: <HeroEE16kWhDayAndNight />,
  },
];
export const customCardComponentMap = customCardComponentList.reduce(
  (map, item) => {
    map[item.value] = {
      ...item,
    };
    return map;
  },
  {} as Record<string, (typeof customCardComponentList)[0]>
);
