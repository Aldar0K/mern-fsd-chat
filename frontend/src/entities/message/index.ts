// TODO add messageModel and messageLib exports
// api
export { apiMessage } from './api/api-message';
export type { SendMessageDto } from './api/api-message';
// model
export * as messageModel from './model';
// lib
export * as messageLib from './lib';
export { isLastMessage } from './lib/utils/isLastMessage';
export { isSameSender } from './lib/utils/isSameSender';
export { isSameSenderMargin } from './lib/utils/isSameSenderMargin';
export { isSameUser } from './lib/utils/isSameUser';
