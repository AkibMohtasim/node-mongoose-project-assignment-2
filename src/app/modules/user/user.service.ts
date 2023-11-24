import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
}


const getUsersFromDB = async () => {
  const result = await UserModel.find();
  return result
}


const getSingleUserFromDB = async (id: number) => {
  const user = await UserModel.findOne({ userId: id });
  return user;

}



export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB
}