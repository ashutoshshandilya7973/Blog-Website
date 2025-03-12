import {z} from 'zod'


const userRegisterSchema=z.object({
    name:z.string({required_error:"name is required"})
    .trim()
    .min(4,{message:"Name must be above 4 letter"})
    .max(20,{message:"Name must be below 20 letter"}),

    email:z.string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email address"}),

    password:z.string({required_error:"Password is required"})
    .trim()
    .min(5,{message:"Password should be of length greater than 5"})
    .max(20,{message:"password should be less than 20 length"})
})

const userLoginSchema=z.object({
   
    email:z.string({required_error:"Email is Required"})
    .trim()
    .email({message:"invalid email address"}),

    password:z.string({required_error:"Password is required"})
    .trim()
    .min(5,{message:"Password should be of length greater than 5"})
    .max(20,{message:"password should be less than 20 length"})
})
const userForgotPasswordSchema=z.object({
    email:z.string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email address"})
})


export {userRegisterSchema,userLoginSchema,userForgotPasswordSchema}