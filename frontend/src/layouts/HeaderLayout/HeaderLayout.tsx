import { FC, ReactNode } from 'react';

import { Header } from 'shared/ui';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
