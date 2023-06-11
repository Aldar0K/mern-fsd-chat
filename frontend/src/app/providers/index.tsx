import { compose } from 'shared/helpers';
import withAuth from './withAuth';

export const withProviders = compose(withAuth);
