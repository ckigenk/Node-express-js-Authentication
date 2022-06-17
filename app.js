const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const auth = require('./route/auth')
const isAuthenticated = require('./middleware/verify-token')

app.use(express.json())
app.use('/auth', auth)
app.use(express.urlencoded({ extended: false }))
app.get('/', isAuthenticated, (req, res) => {
  res.send('Welcome to Home Page')
})

const PORT = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
