import express from 'express';
import cookieparser from 'cookie-parser'
import cors from 'cors'
const app=express();
import { router as authRoute } from './src/router/auth.router.js';
import { router as postRoute } from './src/router/post.router.js';
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        credentials: true, // Allow cookies
    })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)

app.get('/',(req,res)=>{
    res.send({message:"server is running"})
})

export {app}