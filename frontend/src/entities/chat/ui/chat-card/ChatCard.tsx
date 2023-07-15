import { Box, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { FC, MouseEvent } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { chatModel } from 'entities/chat';
import { userLib } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/const';

interface ChatCardProps {
  chat: chatModel.Chat;
}

const ChatCard: FC<ChatCardProps> = ({ chat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const viewer = viewerModel.useViewer();
  const setSelectedChat = chatModel.useChatStore(state => state.setSelectedChat);
  const match = useMatch(`${ROUTES.CHATS}/${chat._id}`);

  const handleContextMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOpen();
  };

  if (!viewer) return null;

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        key={chat._id}
        as={NavLink}
        to={`${ROUTES.CHATS}/${chat._id}`}
        onContextMenu={handleContextMenu}
      >
        <Box
          px='2'
          py='2'
          borderRadius='lg'
          bg={match ? '#38B2AC' : '#E8E8E8'}
          color={match ? 'white' : 'black'}
          userSelect='none'
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
      </MenuButton>

      <MenuList px={2}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatCard;
