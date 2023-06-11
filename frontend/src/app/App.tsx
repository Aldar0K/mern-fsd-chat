import './styles/main.scss';

import AppRouter from './AppRouter';
import { withProviders } from './providers';

const App = () => {
  return <AppRouter />;
};

export default withProviders(App);
