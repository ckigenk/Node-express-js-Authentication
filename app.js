const express=require('express')
const app=express()
const connectDB=require('./db/connect')
require('dotenv').config()
const auth = require('./route/auth')

app.use('/auth', auth)

const PORT=5001

const start=async()=>{
 try {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT,()=>{
   console.log(`Server is listening on port ${PORT}...`)
  })
 } catch (error) {
  console.log(error);
 }
}

start()
