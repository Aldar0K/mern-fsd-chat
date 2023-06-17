import { useQuery } from 'react-query';

import { useHandleError } from 'shared/lib/hooks';
import { userApi } from '../..';

export const useSearchUserQuery = (searchValue: string) => {
  const handleError = useHandleError();

  return useQuery(
    [`/user?search=${searchValue}`, searchValue],
    async () => (searchValue.length ? await userApi.searchUser(searchValue) : []),
    {
      onError(error) {
        handleError(error);
      }
    }
  );
};
