import { FC } from 'react';

import { viewerModel } from 'entities/viewer';
import styles from './Header.module.scss';

import { HeaderAuth } from './variants';

// TODO add HeaderDefault variant for unauthorized users?

const Header: FC = () => {
  const isAuth = viewerModel.useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {isAuth ? <HeaderAuth /> : <h2>HeaderDefault</h2>}
      </div>
    </header>
  );
};

export default Header;
