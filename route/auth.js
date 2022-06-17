const express = require('express')
const router = express()
const { register, login } = require('../controller/auth')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/register').get((req, res) => res.send('Register Page'))

module.exports = router
