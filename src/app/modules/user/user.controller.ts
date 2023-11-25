import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema, { ordersValidaitonSchema } from "./user.validation";




// creating a user 

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    const { error, value } = userValidationSchema.validate(newUser);

    if (error) {
      res.status(500).json({
        success: false,
        error: "Coudn't create the user!",
        message: error?.details[0]?.message
      })
    }
    else {
      const result = await userServices.createUserIntoDB(value);
      res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: result
      })
    }
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
      res.status(404).json({
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
  const { error, value } = userValidationSchema.validate(updatedObj);

  try {
    if (error) {
      res.status(500).json({
        success: false,
        error: "Coudn't update the user!",
        message: error?.details[0]?.message
      })
    }
    else {
      const result = await userServices.updateSingleUserInDB(id, value);
      if (result) {
        res.status(200).json({
          success: true,
          message: "User updated successfully!",
          data: result
        })
      }
      else {
        res.status(404).json({
          "success": false,
          "message": "User not found",
          "error": {
            "code": 404,
            "description": "User not found!"
          }
        })
      }
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


// delete a single user

const deleteSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  try {
    const result = await userServices.deleteSingleUserFromDB(id);
    if (result) {
      res.status(200).json({
        "success": true,
        "message": "User deleted successfully!",
        "data": null
      })
    }
    else {
      res.status(404).json({
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
      message: "Coudn't delete the user!",
      error: {
        code: 500,
        description: "Coudn't delete the user"
      }
    })
  }
}



// add a new product in the order

const addProductInOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  const updatedOrderObj = req.body;

  const { error, value } = ordersValidaitonSchema.validate(updatedOrderObj);

  try {
    if (error) {
      res.status(500).json({
        success: false,
        error: "Coudn't add the order!",
        message: error?.details[0]?.message
      })
    }
    else {
      const result = await userServices.addProductOrderInDB(id, value);

      if (result) {
        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          data: null
        })
      }
      else {
        res.status(404).json({
          "success": false,
          "message": "User not found",
          "error": {
            "code": 404,
            "description": "User not found!"
          }
        })
      }
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Coudn't create the order!",
      error: {
        code: 500,
        description: "Coudn't create the order."
      }
    })
  }
}

// getting all orders from a single user

const getAllOrdersFromUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  try {
    const result = await userServices.getAllOrdersFromUserDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result
      })
    }
    else {
      res.status(404).json({
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
      message: "Coudn't get the orders!",
      error: {
        code: 500,
        description: "Coudn't get the orders"
      }
    })
  }
}


// getting the total order price from a user

const getAllOrdersPriceFromUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  try {
    const result = await userServices.getAllOrdersPriceFromUserDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: {
          totalPrice: result?.totalPrice
        }
      })
    }
    else {
      res.status(404).json({
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
      message: "Coudn't get the orders!",
      error: {
        code: 500,
        description: "Coudn't get the orders"
      }
    })
  }
}


export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addProductInOrder,
  getAllOrdersFromUser,
  getAllOrdersPriceFromUser
}

