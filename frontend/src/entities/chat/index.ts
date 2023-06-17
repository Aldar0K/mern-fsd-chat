// TODO update public api imports
// api
export { apiChat } from './api/api-chat';
export type { AddUserDto, CreateGroupDto, RemoveUserDto, RenameChatDto } from './api/api-chat';
// model
export type { Chat } from './model/types';
export { useChatStore } from './model/chat-store';
export type { ChatState } from './model/chat-store';
// lib
export { useChats } from './lib/hooks/useChats';
export { useAccessChat } from './lib/hooks/useAccessChat';
export { useAddUser } from './lib/hooks/useAddUser';
export { useRemoveUser } from './lib/hooks/useRemoveUser';
export { useCreateGroup } from './lib/hooks/useCreateGroup';
export { useRenameChat } from './lib/hooks/useRenameChat';
// ui
export { ScrollableChat } from './ui';
