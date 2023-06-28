import { userModel } from 'entities/user';

export const getSenderFull = (loggedUser: userModel.User, users: userModel.User[]) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
