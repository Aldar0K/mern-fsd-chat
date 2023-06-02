import { FC } from 'react';

import 'assets/styles/main.scss';
import { useIntercept } from 'hooks';

import AppRouter from 'AppRouter';

const App: FC = () => {
  useIntercept();

  return <AppRouter />;
};

export default App;
