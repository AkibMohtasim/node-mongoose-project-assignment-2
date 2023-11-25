import express from "express";
import { userController } from "./user.controller";



const router = express.Router();


router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);


router.put('/:userId/orders', userController.addProductInOrder)
router.get('/:userId/orders', userController.getAllOrdersFromUser)
router.get('/:userId/orders/total-price', userController.getAllOrdersPriceFromUser)


export const userRouter = router;