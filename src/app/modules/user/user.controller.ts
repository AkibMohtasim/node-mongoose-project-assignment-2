import { Request, Response } from "express";
import { userServices } from "./user.service";




// creating a user 

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
    res.status(500).json({
      success: false,
      message: "Coudn't create the user!",
      error: {
        code: 500,
        description: "Coudn't create the user"
      }
    })
  }
}


// getting all the users

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
    res.status(500).json({
      success: false,
      message: "Coudn't get the users!",
      error: {
        code: 500,
        description: "Coudn't get the users"
      }
    })
  }
}


// getting a single user

const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  try {
    const result = await userServices.getSingleUserFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result
      })
    }
    else {
      res.status(200).json({
        "success": false,
        "message": "User not found",
        "error": {
          "code": 404,
          "description": "User not found!"
        }
      })
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Coudn't get the user!",
      error: {
        code: 500,
        description: "Coudn't get the user"
      }
    })
  }
}

// update a single user

const updateSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  const updatedObj = req.body;
  try {
    const result = await userServices.updateSingleUserInDB(id, updatedObj);
    if (result) {
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result
      })
    }
    else {
      res.status(200).json({
        "success": false,
        "message": "User not found",
        "error": {
          "code": 404,
          "description": "User not found!"
        }
      })
    }


  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Coudn't update the user!",
      error: {
        code: 500,
        description: "Coudn't update the user"
      }
    })
  }
}


export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser
}

