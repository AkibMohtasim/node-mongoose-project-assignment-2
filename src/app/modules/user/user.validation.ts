import Joi from 'joi';



const fullNameValidaitonSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('Your name should only contain letters.'),
  lastName: Joi.string()
    .allow('')
})


const addressValidaitonSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})


const ordersValidaitonSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required().sign("positive"),
  quantity: Joi.number().required().sign("positive"),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  userName: Joi.string().required().min(2),
  password: Joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  fullName: fullNameValidaitonSchema.required(),
  age: Joi.number().integer().required().sign("positive"),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidaitonSchema.required(),
  orders: Joi.array().items(ordersValidaitonSchema).optional()
})




export default userValidationSchema;