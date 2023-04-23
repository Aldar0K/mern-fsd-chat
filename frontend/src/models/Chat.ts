import { User } from 'models';

export interface Chat {
  id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
}
