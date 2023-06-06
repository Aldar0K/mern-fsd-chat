import { User } from 'entities/User';

export interface Chat {
  _id: string;
  chatName: string;
  users: User[];
  isGroupChat: boolean;
  groupAdmin?: User;
  latestMessage?: string;
}
