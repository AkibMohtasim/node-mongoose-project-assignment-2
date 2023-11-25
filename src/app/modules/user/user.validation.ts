import Joi from 'joi';



const fullNameValidaitonSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('Your name should only contain letters.'),
  lastName: Joi.string()
    .allow('')
})


const addressValidaitonSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
})


export const ordersValidaitonSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().sign("positive").required(),
  quantity: Joi.number().sign("positive").required(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string().min(2),
  password: Joi.string().min(6),
  fullName: fullNameValidaitonSchema,
  age: Joi.number().integer().sign("positive"),
  email: Joi.string().email(),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidaitonSchema,
  orders: Joi.array().items(ordersValidaitonSchema)
})




export default userValidationSchema;