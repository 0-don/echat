import React from 'react';
import {
  useFilterUserServiceQuery,
  // useGetCountriesQuery,
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
  const { filterQuery, setCursor } = useServiceFilterStore();
  // const { data: getCountries } = useGetCountriesQuery({
  //   variables: { slug: filterQuery?.slug || undefined },
  // });

  const { data: getLanguages } = useGetLanguagesQuery({
    variables: { slug: filterQuery?.slug || undefined },
  });

  const { refetch } = useFilterUserServiceQuery({
    variables: filterQuery,
    skip: true,
  });

  // const countries = getCountries?.getCountries?.map((country) => country);
  const languages = getLanguages?.getLanguages?.map((language) => language);

  if (!languages) {
    return null;
  }

  return (
    <div className='w-full'>
      <div className='flex flex-wrap w-full justify-center md:justify-start items-center pb-3 -ml-1'>
        <FilterDropdown
          list={languages}
          fieldName='languages'
          className='w-6/12 md:w-44'
          sort
        />
        <FilterDropdown
          list={GENDERS}
          fieldName='genders'
          className='w-6/12 md:w-36'
          sort
        />
        <FilterDropdown
          list={[
            { id: 1, name: '18-25' },
            { id: 2, name: '26-30' },
            { id: 3, name: '30+' },
          ]}
          fieldName='ages'
          className='w-6/12 md:w-36'
          sort
        />
        <FilterDropdown
          list={[
            { id: 1, name: '0-5' },
            { id: 2, name: '5-10' },
            { id: 3, name: '10-20' },
            { id: 4, name: '20+' },
          ]}
          className='w-6/12 md:w-36'
          fieldName='prices'
        />
        <div className='md:p-0 p-1 mt-0.5'>
          <Button
            text='filter'
            className='h-10 w-full md:w-12'
            onClick={async () => {
              setCursor(undefined);
              await refetch(filterQuery);
            }}
          />
        </div>
      </div>
    </div>
  );
};
