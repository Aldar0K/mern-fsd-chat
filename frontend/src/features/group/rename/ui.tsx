import { Button, FormControl, Input } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { useRenameChat } from 'features/group';
import { useNotify } from 'shared/lib/hooks';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

interface Props {
  className?: string;
}

const RenameGroupForm: FC<Props> = ({ className }) => {
  const notify = useNotify();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);
  const [value, setValue] = useState<string>(selectedChat?.chatName || '');
  const { mutateAsync: renameChatMutate, isLoading: renameChatLoading } = useRenameChat();

  const handleRename = async () => {
    if (!selectedChat) return;
    if (!value) {
      notify({ text: 'Please enter a group name', type: 'warning' });
      return;
    }
    if (value === selectedChat.chatName) {
      notify({ text: 'Please enter a new group name', type: 'warning' });
      return;
    }

    const updatedChat = await renameChatMutate({
      chatId: selectedChat._id,
      chatName: value
    });
    setSelectedChat(updatedChat);
  };

  return (
    <FormControl display='flex' className={className}>
      <Input
        placeholder='Chat name'
        mr={2}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button
        variant='solid'
        colorScheme='teal'
        isLoading={renameChatLoading}
        onClick={handleRename}
      >
        Update
      </Button>
    </FormControl>
  );
};

export default RenameGroupForm;
