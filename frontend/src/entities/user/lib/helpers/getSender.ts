import { userModel } from 'entities/user';

export const getSender = (loggedUser: userModel.User, users: userModel.User[]) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
