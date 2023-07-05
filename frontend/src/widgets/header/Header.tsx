import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { viewerModel } from 'entities/viewer';
import styles from './Header.module.scss';

import { AuthToolbar } from 'features/auth-toolbar';
import { NotificationBadge } from 'features/notification-badge';
import { SearchUsers } from 'features/search-users';

const Header: FC = () => {
  const isAuth = viewerModel.useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          bg='white'
          w='100%'
          p='5px 10px'
          borderWidth='5px'
        >
          {isAuth && <SearchUsers />}
          <Text fontSize='2xl'>Chat App</Text>
          <div className='flex gap-2'>
            {isAuth && <NotificationBadge />}
            {isAuth && <AuthToolbar />}
          </div>
        </Box>
      </div>
    </header>
  );
};

export default Header;
