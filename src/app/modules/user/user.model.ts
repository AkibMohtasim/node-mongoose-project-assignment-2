import { Schema, model } from "mongoose";
import { Address, FullName, Orders, User } from "./user.interface";




const fullNameSchema = new Schema<FullName>({
  firstName: String,
  lastName: String
})


const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  country: String
})

const ordersSchema = new Schema<Orders>({
  productName: String,
  price: Number,
  quantity: Number
})


const userSchema = new Schema<User>({
  userId: Number,
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  orders: ordersSchema
})



export const UserModel = model<User>('User', userSchema);