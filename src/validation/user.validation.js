const validator = require('validator')

const signupValidation = (req, res, next) => {

    const { first_name, last_name, email, password, phone, address, is_admin } = req.body

    if (!validator.isAlpha(first_name) || !validator.isAlpha(last_name)) {
        res.send ({
            status: 'error',
            message: 'name can not contain numbers or special symbol'
        })
    } else if (!validator.isEmail(email)) {
        res.send ({
            status: 'error',
            message: 'please enter a valid email address'
        })
    } else if (!validator.isStrongPassword(password)) {
        res.send ({
            status: 'error',
            message: 'please enter a strong password'
        })
    } else if (!validator.isMobilePhone(phone)) {
        res.send ({
            status: 'error',
            message: 'please enter a valid phone number'
        })
    } else if (validator.isEmpty(address)) {
        res.send ({
            status: 'error',
            message: 'address can not be empty'
        })
    } else if (validator.isEmpty(is_admin)) {
        res.send ({
            status: 'error',
            message: 'expected boolean value for is_admin'
        })
    } else {
        next()
    }
}

const signinValidation = (req, res, next) => {
    const { email, password } = req.body

    if (!validator.isEmail(email)) {
        res.send ({
            status: 'error',
            message: 'please enter a valid email address'
        })
    } else if (!validator.isStrongPassword(password)) {
        res.send ({
            status: 'error',
            message: 'please enter a strong password'
        })
    } else {
        next()
    }
}


module.exports = {
    signupValidation,
    signinValidation
}