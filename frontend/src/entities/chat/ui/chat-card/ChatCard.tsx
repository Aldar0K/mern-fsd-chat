import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { chatModel } from 'entities/chat';
import { userLib } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

interface ChatCardProps {
  chat: chatModel.Chat;
}

const ChatCard: FC<ChatCardProps> = ({ chat }) => {
  const viewer = viewerModel.useViewer();
  const setSelectedChat = chatModel.useChatStore(state => state.setSelectedChat);

  if (!viewer) return null;

  return (
    <NavLink key={chat._id} to={`${ROUTES.CHATS}/${chat._id}`}>
      {({ isActive }) => (
        <Box
          px='2'
          py='2'
          borderRadius='lg'
          bg={isActive ? '#38B2AC' : '#E8E8E8'}
          color={isActive ? 'white' : 'black'}
          cursor='pointer'
          onClick={() => setSelectedChat(chat)}
        >
          <Text>{chat.isGroupChat ? chat.chatName : userLib.getSender(viewer, chat.users)}</Text>

          {chat.latestMessage && (
            <Text fontSize='small'>
              {chat.latestMessage.sender.name}: {chat.latestMessage.content}
            </Text>
          )}
        </Box>
      )}
    </NavLink>
  );
};

export default ChatCard;
