import { Message } from 'entities/message';
import { userModel } from 'entities/user';

export interface Chat {
  _id: string;
  chatName: string;
  users: userModel.User[];
  isGroupChat: boolean;
  groupAdmin?: userModel.User;
  latestMessage?: Message;
}
