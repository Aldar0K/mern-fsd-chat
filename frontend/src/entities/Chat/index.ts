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
