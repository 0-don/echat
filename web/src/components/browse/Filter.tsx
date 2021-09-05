import React, { useState } from 'react';
import {
  useFilterUserServiceQuery,
  useGetCountriesQuery,
} from 'src/generated/graphql';
import { Button } from '../htmlElements';
import { FilterDropdown } from '../htmlElements/FilterDropdown';

interface FilterProps {
  slug: string;
}
export type FilterOptions = {
  languages?: { id: number; name: string }[];
  country?: { id: number; name: string };
};

export const Filter: React.FC<FilterProps> = ({ slug }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>({});
  const { data: getCountries } = useGetCountriesQuery();

  const filterQuery = { slug, limit: 10, cursor: null, filterOptions };
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
          fieldName='country'
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
      <Button
        text='HX'
        className='ml-1 h-10 mt-5'
        onClick={async () => {
          await refetch({ ...filterQuery });
        }}
      />
    </div>
  );
};
