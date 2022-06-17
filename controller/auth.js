const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    if (!(firstName && lastName && email && password)) {
      return ('All sections are required!')
    }
    if (Users.findOne({ email })) {
      return ('User already exist. Please login')
    }
    const encryptedPassword = bcrypt.hash(password, 10)

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword
    })

    const token = jwt.sign({ user_id: Users._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' })
    user.token = token
    res.status(201).json(user)
  } catch (error) {
    return ('There was an error. Please try again.')
  }
}

const login = (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email & password)) {
      return 'All sections are required!'
    }
    const user = Users.findOne({ email })
    if (user && (bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: Users._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' })
      user.token = token
      res.json(user)
    }
  } catch (error) {
    return 'Invalid tokens'
  }
}

module.exports = { register, login }
