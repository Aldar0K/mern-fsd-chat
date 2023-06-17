import { FC, ReactNode } from 'react';

import { Header } from 'widgets/header';

interface HeaderLayoutProps {
  children: ReactNode;
}

// TODO remove this component?

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
