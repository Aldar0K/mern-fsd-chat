import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { Chat } from 'models';
import styles from './ChatsPage.module.scss';

const ChatsPage: FC = () => {
  const [chats, setChats] = useState<Chat[]>();

  const getChats = async () => {
    const response = await axios.get<Chat[]>('/api/chat');
    const chats = response.data;
    if (chats) setChats(chats);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className={styles.container}>
      <h1>ChatsPage</h1>
      {!!chats?.length && chats.map(chat => <p key={chat.id}>{chat.chatName}</p>)}
    </div>
  );
};

export default ChatsPage;
