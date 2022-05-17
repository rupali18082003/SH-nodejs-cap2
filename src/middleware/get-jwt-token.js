const jwt = require('jsonwebtoken')

exports.getToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})

