import { FormControl, Input, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';

import { chatModel } from 'entities/chat';
import { UserListItem, userModel } from 'entities/user';
import { viewerModel } from 'entities/viewer';
import { useAddUser } from 'features/group';
import { useNotify } from 'shared/lib/hooks';
import { ChatsLoader } from 'shared/ui';

const selector = (state: chatModel.ChatState) => ({
  selectedChat: state.selectedChat,
  setSelectedChat: state.setSelectedChat
});

interface Props {
  className?: string;
}

const AddUserForm: FC<Props> = ({ className }) => {
  const notify = useNotify();
  const viewer = viewerModel.useViewer();
  const { mutateAsync: addUserMutate, isLoading: addUserLoading } = useAddUser();
  const [value, setValue, searchResults, searchLoading] = userModel.useSearchUsers();
  const { selectedChat, setSelectedChat } = chatModel.useChatStore(selector, shallow);

  const handleAddUser = async (userToAdd: userModel.User) => {
    if (!selectedChat || !viewer) return;
    if (selectedChat.users.find(user => user._id === userToAdd._id)) {
      notify({ text: 'User already in the group', type: 'error' });
      return;
    }
    if (selectedChat.groupAdmin?._id !== viewer._id) {
      notify({ text: 'Only administrators can add someone to the group', type: 'error' });
      return;
    }

    const updatedChat = await addUserMutate({ chatId: selectedChat._id, userId: userToAdd._id });
    setSelectedChat(updatedChat);
  };

  return (
    <>
      <FormControl className={className}>
        <Input
          mb={3}
          placeholder='Add user to group...'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </FormControl>
      {searchLoading || addUserLoading ? (
        <ChatsLoader amount={4} />
      ) : (
        <Stack>
          {!!searchResults?.length &&
            searchResults
              .slice(0, 4)
              .map(user => (
                <UserListItem key={user._id} user={user} handleClick={() => handleAddUser(user)} />
              ))}
        </Stack>
      )}
    </>
  );
};

export default AddUserForm;
