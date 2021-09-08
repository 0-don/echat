import React from 'react';
import {
  useFilterUserServiceQuery,
  useGetCountriesQuery,
} from 'src/generated/graphql';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import { Button } from '../htmlElements';
import { FilterDropdown } from '../htmlElements/FilterDropdown';

export const Filter: React.FC = () => {
  const { filterQuery } = useServiceFilterStore();
  const { data: getCountries } = useGetCountriesQuery({
    variables: { slug: filterQuery?.slug || undefined },
  });

  const { refetch } = useFilterUserServiceQuery({
    variables: filterQuery,
    skip: true,
  });

  const countries = getCountries?.getCountries?.map((country) => country);
  if (!countries) {
    return null;
  }

  return (
    <div className='flex mb-5 items-center'>
      <div className='w-64'>
        <FilterDropdown list={countries} fieldName='countries' />
      </div>
      <Button
        text='HX'
        className='ml-1 h-10 mt-5'
        onClick={async () => {
          // console.log(filterOptions);
          // console.log(filterQuery);
          await refetch(filterQuery);
        }}
      />
    </div>
  );
};
