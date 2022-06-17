const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuthenticated = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-tokens']

  if (!token) {
    return res.send('Authentication credentials are required')
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)

    req.user = decoded
  } catch (err) {
    return res.send('Invalid tokens')
  }
  return next()
}

module.exports = isAuthenticated
