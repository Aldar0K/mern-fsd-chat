import { useEffect, useState } from 'react';

import { useDebounce } from 'hooks/common/useDebounce';
import { useSearchUserQuery } from 'hooks/queries/useSearchUserQuery';

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
