import { customError } from "../utils/customErrorHandler.js";

const validator=(schema)=>async (req,res,next)=>{
    try {
        await schema.parse(req.body);
        next()
    } catch (error) {
        return next(new customError(400,error.message))
    }
}
export {validator}