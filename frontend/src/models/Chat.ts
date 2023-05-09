import { User } from 'models';

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
}
