import { Model, Types } from "mongoose";

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Orders {
  productName: string;
  price: number;
  quantity: number;
}

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Types.Array<string>;
  address: Address;
  orders?: Orders[];
}


// for adding a custom static method

export interface IsUserExists extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsCheck(id: number): User | null;
}
