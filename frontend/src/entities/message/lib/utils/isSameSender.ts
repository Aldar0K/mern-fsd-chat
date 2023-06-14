import { Message } from 'entities/message';

export const isSameSender = (
  messages: Message[],
  message: Message,
  index: number,
  userId: string
) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};
