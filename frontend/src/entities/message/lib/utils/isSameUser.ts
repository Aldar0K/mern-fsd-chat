import { Message } from 'entities/message';

export const isSameUser = (messages: Message[], message: Message, index: number) => {
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
};
