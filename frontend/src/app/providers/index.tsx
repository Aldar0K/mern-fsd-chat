import { compose } from 'shared/helpers';
import withAuth from './withAuth';
import withChakraUi from './withChakraUi';
import withQueryClient from './withQueryClient';
import withRouter from './withRouter';

export { withAuth, withChakraUi, withQueryClient, withRouter };

export const withProviders = compose(withAuth, withQueryClient);
