import './styles/main.scss';

import AppRouter from './AppRouter';
import { withAuth, withChakraUi, withQueryClient, withRouter } from './providers';

const App = () => {
  return <AppRouter />;
};

export default withRouter(withChakraUi(withQueryClient(withAuth(App))));
