import { userModel, database } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return { user, err: null };
      } else {
        throw new Error(`Incorrect password`);
      }
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  } catch (err: any) {
    return { user: null, err: err.message };
  }
};

const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export { getUserByEmailIdAndPassword, getUserById };
