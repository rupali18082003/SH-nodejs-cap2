const validator = require('validator')

	const validate = (first_name, last_name, email, password, phone, address, is_admin) => {
    if (!validator.isAlpha(first_name) || !validator.isAlpha(last_name)) {
        return {
            status: 'error',
            message: 'name can not contain numbers or special symbol'
        }
    } else if (!validator.isEmail(email)) {
        return {
            status: 'error',
            message: 'please enter a valid email address'
        }
    } else if (!validator.isStrongPassword(password)) {
        return {
            status: 'error',
            message: 'please enter a strong password'
        }
    } else if (!validator.isMobilePhone(phone)) {
        return {
            status: 'error',
            message: 'please enter a valid phone number'
        }
    } else if (validator.isEmpty(address)) {
        return {
            status: 'error',
            message: 'address can not be empty'
        }
    } else if (validator.isEmpty(is_admin)) {
        return {
            status: 'error',
            message: 'expected boolean value for is_admin'
        }
    } else {
        return 1
    }
}


module.exports = validate