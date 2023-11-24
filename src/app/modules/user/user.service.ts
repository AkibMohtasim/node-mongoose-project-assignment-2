import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);

  const { userId, username, fullName, age, email, isActive, hobbies, address } = result;

  const returnedObj = {
    userId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address
  };

  return returnedObj;
}


const getUsersFromDB = async () => {
  const result = await UserModel.find().select('username fullName age email address -_id');
  return result
}


const getSingleUserFromDB = async (id: number) => {
  const user = await UserModel.findOne({ userId: id }).select('userId username fullName age email isActive hobbies address -_id');
  return user;
}

const updateSingleUserInDB = async (id: number, updatedObj: object) => {
  const user = await UserModel.findOneAndUpdate({ userId: id }, updatedObj,
    {
      new: true,
      select: 'userId username fullName age email isActive hobbies address -_id'
    });
  // console.log({ updatedUser: user })
  return user;
}



export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB
}