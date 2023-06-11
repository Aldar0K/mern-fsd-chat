/* eslint-disable react/display-name */

import { ChakraProvider } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

const withChakraUi = (WrappedComponent: FunctionComponent) => {
  return () => {
    return (
      <ChakraProvider>
        <WrappedComponent />
      </ChakraProvider>
    );
  };
};

export default withChakraUi;
