const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!(firstName && lastName && email && password)) {
      res.send('All fields are mandatory!')
    }
    const userExist = await Users.findOne({ email })
    if (userExist) {
      res.send('User already exist. Please login')
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword
    })

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' })

    user.token = token
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send('There was an error registering. Please try again.')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.send('All fields are required!')
    }
    const user = await Users.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' })
      user.token = token
      res.status(200).json(user)
    }
    res.status(404).send('Invalid credentials!')
  } catch (error) {
    res.status(500).send('There was an error logging in. Please try again.')
  }
}

module.exports = { register, login }
