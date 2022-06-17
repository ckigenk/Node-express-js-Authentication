const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const auth = require('./route/auth')

app.use(express.json())
app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send('Welcome to Home Page')
})

const PORT = 3000

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
