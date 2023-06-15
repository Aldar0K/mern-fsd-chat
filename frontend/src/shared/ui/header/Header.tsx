import { FC } from 'react';

import { viewerModel } from 'entities/viewer';
import styles from './Header.module.scss';

import { HeaderAuth } from 'shared/ui/header-auth';

// TODO add HeaderDefault variant for unauthorized users?

const Header: FC = () => {
  const viewer = viewerModel.useViewerStore(state => state.viewer);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {viewer ? <HeaderAuth /> : <h2>HeaderDefault</h2>}
      </div>
    </header>
  );
};

export default Header;
