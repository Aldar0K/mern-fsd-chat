import { ChakraProvider } from '@chakra-ui/react';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/main.scss';

import AppRouter from './AppRouter';
import { withProviders } from './providers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h2>Loading...</h2>}>
          <AppRouter />
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default withProviders(App);
