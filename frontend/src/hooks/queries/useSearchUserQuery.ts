import { useQuery } from 'react-query';

import { apiUser } from 'api';
import { useHandleError } from 'hooks';

export const useSearchUserQuery = (searchValue: string) => {
  const handleError = useHandleError();

  return useQuery(
    [`/user?search=${searchValue}`, searchValue],
    async () => (searchValue.length ? await apiUser.searchUser(searchValue) : []),
    {
      onError(error) {
        handleError(error);
      }
    }
  );
};
