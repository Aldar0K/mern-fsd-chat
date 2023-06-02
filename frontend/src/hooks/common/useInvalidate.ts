import { useQueryClient } from 'react-query';

export function useInvalidate(): (query: string) => Promise<void> {
  const queryClient = useQueryClient();
  return (query: string) => queryClient.invalidateQueries(query);
}
