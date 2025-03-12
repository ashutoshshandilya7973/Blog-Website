import express from 'express';
import cookieparser from 'cookie-parser'
import cors from 'cors'
const app=express();
import { router as authRoute } from './src/router/auth.router.js';
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use('/api/auth',authRoute)


app.get('/',(req,res)=>{
    res.send({message:"server is running"})
})

export {app}