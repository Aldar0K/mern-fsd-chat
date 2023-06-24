import { InvalidateOptions, InvalidateQueryFilters, QueryKey, useQueryClient } from 'react-query';

export function useInvalidate(): (
  query: QueryKey,
  invalidateQueryFilters?: InvalidateQueryFilters,
  invalidateOptions?: InvalidateOptions
) => Promise<void> {
  const queryClient = useQueryClient();
  return (
    query: QueryKey,
    invalidateQueryFilters?: InvalidateQueryFilters,
    invalidateOptions?: InvalidateOptions
  ) => queryClient.invalidateQueries(query, invalidateQueryFilters, invalidateOptions);
}
