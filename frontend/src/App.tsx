import { FC } from 'react';

import 'assets/styles/main.scss';
import { AppRouter } from 'components';

const App: FC = () => {
  return (
    <div className='wrapper'>
      <AppRouter />
    </div>
  );
};

export default App;
