import { FC } from 'react';

import { useUserStore } from 'store';
import styles from './Header.module.scss';

// TODO add HeaderDefault variant for unauthorized users?
import { HeaderAuth } from './variants';

const Header: FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {user ? <HeaderAuth /> : <h2>HeaderDefault</h2>}
      </div>
    </header>
  );
};

export default Header;
