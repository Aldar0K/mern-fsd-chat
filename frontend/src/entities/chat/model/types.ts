import { Message } from 'entities/message';
import { User } from 'entities/user';

export interface Chat {
  _id: string;
  chatName: string;
  users: User[];
  isGroupChat: boolean;
  groupAdmin?: User;
  latestMessage?: Message;
}
