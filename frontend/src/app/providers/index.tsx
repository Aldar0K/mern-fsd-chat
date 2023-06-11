import { compose } from 'ramda';

import withAuth from './withAuth';
import withChakraUi from './withChakraUi';
import withQueryClient from './withQueryClient';
import withRouter from './withRouter';

export const withProviders = compose(withRouter, withAuth, withQueryClient, withChakraUi);
