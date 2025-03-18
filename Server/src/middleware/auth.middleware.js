import { customError } from "../utils/customErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'
import { prisma } from "../utils/prismaClient";
const verifyToken=asyncHandler(async (req,_,next)=>{
       
    const token =req.cookies?.assessToken;
    if(!token){
        return next(new customError(401,'Unauthorized Access'))
    }
    const data=jwt.verify(token,process.env.ACCESSTOKEN_KEY);
    const user = await prisma.user.findFirst({
        where:{
            email:data.email
        }
    })
    if(!user){
        return next(new customError(400,'invalid access token'))
    }
    req.user=user;
    next();
})

export {verifyToken}


