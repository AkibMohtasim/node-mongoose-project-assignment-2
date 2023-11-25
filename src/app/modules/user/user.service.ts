import { Order, User } from "./user.interface";
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
  // const isExists = await UserModel.exists({ userId: id });
  const isExists = await UserModel.isUserExistsCheck(id);

  if (isExists !== null) {
    const user = await UserModel.findOne({ userId: id }).select('userId username fullName age email isActive hobbies address -_id');
    return user;
  }
  return isExists;
}

const updateSingleUserInDB = async (id: number, updatedObj: object) => {
  const isExists = await UserModel.isUserExistsCheck(id);
  if (isExists !== null) {
    const user = await UserModel.findOneAndUpdate({ userId: id }, updatedObj,
      {
        new: true,
        select: 'userId username fullName age email isActive hobbies address -_id'
      });

    return user;
  }
  return isExists;
}

const deleteSingleUserFromDB = async (id: number) => {
  const isExists = await UserModel.isUserExistsCheck(id);

  if (isExists !== null) {
    const result = await UserModel.deleteOne({ userId: id });
    return result;
  }
  return isExists;
}



const addProductOrderInDB = async (id: number, updatedObj: Order) => {
  const isExists = await UserModel.isUserExistsCheck(id);
  if (isExists !== null) {
    const orderData = await UserModel.findOne({ userId: id }).select('orders -_id');

    // nullish coalescing 
    const orderCount = orderData?.orders?.length ?? 0;

    const existingOrdersArray = orderData?.orders ?? [];

    const newOrdersArray = (orderCount > 0) ? [...existingOrdersArray, updatedObj] : [updatedObj];

    const result = await UserModel.findOneAndUpdate({ userId: id }, { orders: newOrdersArray });

    return result;
  }
  return isExists;
}


// get orders data from a single user

const getAllOrdersFromUserDB = async (id: number) => {
  const isExists = await UserModel.isUserExistsCheck(id);

  if (isExists !== null) {
    const orders = await UserModel.findOne({ userId: id }).select('orders -_id');
    return orders;
  }
  return isExists;
}



export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserFromDB,
  addProductOrderInDB,
  getAllOrdersFromUserDB
}