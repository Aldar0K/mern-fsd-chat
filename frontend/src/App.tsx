import { FC } from 'react';

import 'assets/styles/main.scss';
import { AppRouter } from 'components';

const App: FC = () => {
  return (
    <div className='wrapper'>
      <main className='main'>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
