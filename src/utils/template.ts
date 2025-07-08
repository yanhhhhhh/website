import { TemplateGroupByCountry } from '@/api/template';
import { Region } from '@/constants';
import { RegionCountry } from './../constants/region';

export function mapTemplateGroupIdsToRegions(
  templateGroupData: TemplateGroupByCountry[],
  regionData: Region[]
) {
  // Create a map for easy lookup of templateGroupId by countryCode and languageCode
  const templateGroupMap = new Map();

  // Fill the map with templateGroupData entries
  templateGroupData.forEach(
    ({ templateGroupId, countryCode, languageCode }) => {
      const key = `${countryCode}_${languageCode}`;
      templateGroupMap.set(key, templateGroupId);
    }
  );

  // Iterate over each region and update the countries with templateGroupId
  regionData.forEach((region) => {
    region.countries.forEach((country) => {
      const key = `${country.countryCode}_${country.languageCode}`;
      if (templateGroupMap.has(key)) {
        country.templateGroupId = templateGroupMap.get(key);
      }
    });
  });

  return regionData;
}
export function getAllCountry(regionData: Region[]) {
  const countryList: RegionCountry[] = [];
  regionData.forEach((region) => {
    countryList.push(...region.countries);
  });
  return countryList;
}
export function filterRegionsAndCountriesByTemplateGroupIds(
  regionCountry: Region[],
  templateGroupIds: string[]
) {
  // Convert templateGroupIds to a Set for efficient lookup
  const templateGroupIdSet = new Set(templateGroupIds);

  // Filter regions and their countries
  return regionCountry
    .map((region) => {
      // Filter countries within the region
      const filteredCountries = region.countries.filter((country) =>
        templateGroupIdSet.has(country.templateGroupId)
      );

      // Return the region only if it has at least one country with a matching templateGroupId
      if (filteredCountries.length > 0) {
        return {
          ...region,
          countries: filteredCountries,
        };
      }

      return null;
    })
    .filter((region) => region !== null); // Remove null entries where no countries matched
}
