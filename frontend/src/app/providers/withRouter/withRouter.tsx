/* eslint-disable react/display-name */

import { FunctionComponent, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const withRouter = (WrappedComponent: FunctionComponent) => {
  return () => {
    return (
      <BrowserRouter>
        <Suspense fallback={<h2>Loading...</h2>}>
          <WrappedComponent />
        </Suspense>
      </BrowserRouter>
    );
  };
};

export default withRouter;
