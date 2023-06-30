import { Message } from '../../model';

export const isLastMessage = (messages: Message[], index: number, userId: string) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
