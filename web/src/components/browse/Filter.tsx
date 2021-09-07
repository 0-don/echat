import React, { useState } from 'react';
import {
  FilterOptions,
  useFilterUserServiceQuery,
  useGetCountriesQuery,
} from 'src/generated/graphql';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import { Button } from '../htmlElements';
import { FilterDropdown } from '../htmlElements/FilterDropdown';

export const Filter: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>({});
  const { filterQuery, setOptions } = useServiceFilterStore();
  const { data: getCountries } = useGetCountriesQuery();

  const { refetch } = useFilterUserServiceQuery({
    variables: filterQuery,
    skip: true,
  });

  const countries = getCountries?.getCountries.map((country) => country);
  if (!countries) {
    return null;
  }

  return (
    <div className='flex mb-5 items-center'>
      <div className='w-64'>
        <FilterDropdown
          list={countries}
          fieldName='countries'
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
      <Button
        text='HX'
        className='ml-1 h-10 mt-5'
        onClick={async () => {
          filterOptions && setOptions(filterOptions);
          console.log(filterQuery)
          await refetch({ ...filterQuery });
        }}
      />
    </div>
  );
};
