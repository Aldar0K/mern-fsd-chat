/* eslint-disable react/display-name */

import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const withQueryClient = (WrappedComponent: FunctionComponent) => {
  return () => {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent />
      </QueryClientProvider>
    );
  };
};

export default withQueryClient;
