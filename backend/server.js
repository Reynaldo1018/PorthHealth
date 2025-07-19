import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api end point
app.use('/api/admin',adminRouter)
//app.use('/api/admin/add-doctor',adminRouter)
// localhost:400/api/admin/login


app.get('/',(resq,res)=>{
    res.send('API WORKING Greet now')
})

app.listen(port, ()=> console.log('Server Started', port))