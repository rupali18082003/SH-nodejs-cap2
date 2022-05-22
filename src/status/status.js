const error = (message) => {
	return {
		status: 'error',
		message
	}
}

const success = (data) => {
	return {
		status: 'success',
		data
	}
}

module.exports = {
	error,
	success
}