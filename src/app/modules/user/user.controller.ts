import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = await userServices.createUserIntoDB(newUser);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result
    })
  }
  catch (err) {
    console.log(err)
  }
}


const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result
    })
  }
  catch (err) {
    console.log(err)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  try {
    const result = await userServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result
    })
  }
  catch (err) {
    console.log(err)
  }
}


export const userController = {
  createUser,
  getUsers,
  getSingleUser
}

