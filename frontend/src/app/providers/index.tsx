import { compose } from 'shared/helpers';
import withAuth from './withAuth';
import withChakraUi from './withChakraUi';
import withQueryClient from './withQueryClient';

export { withAuth, withChakraUi, withQueryClient };

export const withProviders = compose(withAuth, withQueryClient);
