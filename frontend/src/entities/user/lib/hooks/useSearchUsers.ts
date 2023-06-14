import { useEffect, useState } from 'react';

import { useSearchUserQuery } from 'entities/user';
import { useDebounce } from 'shared/lib';

export const useSearchUsers = (initialValue = '') => {
  const [value, setValue] = useState<string>(initialValue);
  const [searchValue, setSearchValue] = useState<string>('');
  const { data: searchResults, isLoading: searchLoading } = useSearchUserQuery(searchValue);

  const debouncedSearchValue = useDebounce<string>(value, 500);
  useEffect(() => {
    if (value.length) setSearchValue(value);
  }, [debouncedSearchValue]);

  return [value, setValue, searchResults, searchLoading] as const;
};
