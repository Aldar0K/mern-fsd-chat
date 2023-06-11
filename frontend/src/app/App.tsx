import { Suspense } from 'react';

import './styles/main.scss';

import AppRouter from './AppRouter';
import { withAuth, withChakraUi, withQueryClient } from './providers';

const App = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <AppRouter />
    </Suspense>
  );
};

export default withChakraUi(withQueryClient(withAuth(App)));
