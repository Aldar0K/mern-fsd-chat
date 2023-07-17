import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC, MouseEvent } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { chatModel } from 'entities/chat';
import { userLib } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { useLeaveGroup } from 'features/group';
import { ROUTES } from 'shared/const';

interface ChatCardProps {
  chat: chatModel.Chat;
}

const ChatCard: FC<ChatCardProps> = ({ chat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const viewer = viewerModel.useViewer();
  const setSelectedChat = chatModel.useChatStore(state => state.setSelectedChat);
  const { mutateAsync: leaveGroupMutate, isLoading: leaveGroupLoading } = useLeaveGroup();
  const match = useMatch(`${ROUTES.CHATS}/${chat._id}`);

  const handleContextMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOpen();
  };

  const handleLeaveGroup = () => {
    if (!viewer) return;
    leaveGroupMutate({ chatId: chat._id, userId: viewer._id });
  };

  const handleDeleteChat = () => {
    // TODO add delete chat logic
    console.log('delete chat');
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
        <MenuItem
          as={Button}
          variant='solid'
          colorScheme='red'
          width='100%'
          onClick={chat.isGroupChat ? handleLeaveGroup : handleDeleteChat}
          isLoading={leaveGroupLoading}
        >
          {chat.isGroupChat ? 'Leave Group' : 'Delete'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatCard;
