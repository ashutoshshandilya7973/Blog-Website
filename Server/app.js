import express from 'express';
import cors from 'cors'
const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth')


app.get('/',(req,res)=>{
    res.send({message:"server is running"})
})

export {app}