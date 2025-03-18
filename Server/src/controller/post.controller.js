import { uploadOnCloud } from "../helper/cloudinary.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { customError } from "../utils/customErrorHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { prisma } from "../utils/prismaClient.js"
const createBlog=asyncHandler(async(req,res,next)=>{
    console.log("enter in the post controller")
    const {title,content,category,user_id}=req.body;
    const localFilePath=req.file.path;
    
    const img= await uploadOnCloud(localFilePath)
    
    if(!img){
        return next(new customError(500,'image uploaded failed'))
    }
    console.log(user_id)
    const upload= await prisma.blog.create({
        data:{
            title,
            content,
            user_id:parseInt(user_id),
            category,
            imgUrl:img.secure_url
        }
    })
    console.log(upload)
    return res.json(new ApiResponse(200,upload,"file uploaded successfully"))

})
 


export {createBlog}