import React from 'react';
import {
  useFilterUserServiceQuery,
  useGetCountriesQuery,
  useGetLanguagesQuery,
} from 'src/generated/graphql';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import { Button } from '../htmlElements';
import { FilterDropdown } from '../htmlElements/FilterDropdown';
import { GENDERS } from 'src/constants';
// {
//   "slug": "call-of-duty-warzone",
//   "limit": 10,
//   "filterOptions": {
//     "languages": [
//       {"id": 2, "name": "Abkhazian"}
//     ]
//   }
// }

export const Filter: React.FC = () => {
  const { filterQuery } = useServiceFilterStore();
  const { data: getCountries } = useGetCountriesQuery({
    variables: { slug: filterQuery?.slug || undefined },
  });

  const { data: getLanguages } = useGetLanguagesQuery({
    variables: { slug: filterQuery?.slug || undefined },
  });

  const { refetch } = useFilterUserServiceQuery({
    variables: filterQuery,
    skip: true,
  });

  const countries = getCountries?.getCountries?.map((country) => country);
  const languages = getLanguages?.getLanguages?.map((language) => language);

  if (!countries || !languages) {
    return null;
  }

  return (
    <div className='flex mb-5 items-center'>
      <div className='w-48 mr-1'>
        <FilterDropdown list={countries} fieldName='countries' />
      </div>
      <div className='w-48 mr-1'>
        <FilterDropdown list={languages} fieldName='languages' />
      </div>
      <div className='w-48'>
        <FilterDropdown list={GENDERS} fieldName='genders' />
      </div>
      <Button
        text='filter'
        className='ml-1 h-10 w-12 mt-1'
        onClick={async () => await refetch(filterQuery)}
      />
    </div>
  );
};
