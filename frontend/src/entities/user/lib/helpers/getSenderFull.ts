import { User } from 'entities/user';

export const getSenderFull = (loggedUser: User, users: User[]) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
