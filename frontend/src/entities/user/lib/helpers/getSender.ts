import { User } from 'entities/user';

export const getSender = (loggedUser: User, users: User[]) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
