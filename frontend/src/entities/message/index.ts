// api
export { apiMessage } from './api/api-message';
export type { SendMessageDto } from './api/api-message';
// model
export type { Message } from './model/types';
export { useNotificationStore } from './model/notification-store';
export type { NotificationState } from './model/notification-store';
// lib
export { useGetMessagesQuery } from './lib/hooks/useGetMessagesQuery';
export { useSendMessage } from './lib/hooks/useSendMessage';
export { isLastMessage } from './lib/utils/isLastMessage';
export { isSameSender } from './lib/utils/isSameSender';
export { isSameSenderMargin } from './lib/utils/isSameSenderMargin';
export { isSameUser } from './lib/utils/isSameUser';
