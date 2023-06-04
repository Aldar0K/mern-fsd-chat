import { FC } from 'react';

import { useIntercept } from 'hooks';
import './styles/main.scss';

import AppRouter from './AppRouter';

const App: FC = () => {
  useIntercept();

  return <AppRouter />;
};

export default App;
