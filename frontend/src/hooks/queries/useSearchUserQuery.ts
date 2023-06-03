import { useQuery } from 'react-query';

import { useHandleError } from 'hooks';
import { apiUser } from 'shared/api';

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
