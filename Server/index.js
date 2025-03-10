import {app} from './app.js'
import {customError} from './src/utils/customErrorHandler.js'
import dotenv from 'dotenv'
import { globalErrorHandler } from './src/middleware/globalHandler.middleware.js';
dotenv.config()

app.use('*',(req,res,next)=>{
    return next(new customError(400,`cant find the ${req.originalUrl} on the server`));
})


app.use(globalErrorHandler);
(async()=>{
    try {
        app.listen(process.env.PORT,()=>{
            console.log(`your server is running on the port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("something is wrong while running the port");
    }

})();





