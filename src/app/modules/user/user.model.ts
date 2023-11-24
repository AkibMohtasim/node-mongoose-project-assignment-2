import { Schema, model } from "mongoose";
import { Address, FullName, Orders, User } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";




const fullNameSchema = new Schema<FullName>({
  firstName: String,
  lastName: String
}, { _id: false })


const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  country: String
}, { _id: false })

const ordersSchema = new Schema<Orders>({
  productName: String,
  price: Number,
  quantity: Number
}, { _id: false })


const userSchema = new Schema<User>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 5, maxlength: 20 },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true, },
  isActive: { type: Boolean, default: true },
  hobbies: [String],
  address: addressSchema,
  orders: [ordersSchema]
})


userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user?.password, Number(config.bcrypt_salt_round));
  next();
})

// userSchema.post('save', async function (doc, next) {
//   next();
// })



export const UserModel = model<User>('User', userSchema);