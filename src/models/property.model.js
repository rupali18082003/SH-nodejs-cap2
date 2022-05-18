const db = require('../configs/db.config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    createNewProp,
    findPropById,
    updatePropById,
    updatePropByStatus,
    deletePropById,
    viewAll,
    findByType,
    updateFun
} = require('../database/queries.js')


class Property {
    constructor(user_id, item, status, price, state, city, address, image_url, type, created_on) {
        this.item = item
        this.status = status
        this.price = price
        this.state = state
        this.city = city
        this.address = address
        this.image_url = image_url
        this.type = type
        this.user_id = user_id
        this.created_on = created_on
    }

    static create(newProp, result) {
        db.query(createNewProp, [
            newProp.user_id,
            newProp.item,
            newProp.status,
            newProp.price,
            newProp.state,
            newProp.city,
            newProp.address,
            newProp.image_url,
            newProp.type,
        ], (err, res) => {
            if (err) result({
                status: 'error',
                message: err.message
            }, null)

            db.query(findPropById, [res.insertId], (err, data) => {
                result(null, {
                    status: 'sucess',
                    data
                })
            })

        })
    }

    static update(id, body, result) {    
        db.query(findPropById, [id], (err, res) => {
            if(err) return result({
                status: 'error',
                message: err.message
            }, null)

           if(!res.length)
               return result({
                   status: 'sucess',
                   message: 'property not found'
               })

            if(body.item) 
            db.query(updateFun('item'), [body.item, id])
            if(body.status) 
                db.query(updateFun('status'), [body.status, id])
            if(body.price) 
                db.query(updateFun('price'), [body.price, id])
            if(body.state) 
                db.query(updateFun('state'), [body.state, id])
            if(body.city) 
                db.query(updateFun('city'), [body.city, id])
            if(body.address) 
                db.query(updateFun('address'), [body.address, id])
            if(body.image_url) 
                db.query(updateFun('image_url'), [body.image_url, id])
            if(body.type) 
                db.query(updateFun('type'), [body.type, id])

            db.query(findPropById, [id], (err, data) => result(null, {status: 'sucess', data}))
            
        })
      
    }

    static updateStatus(id, status, result) {
        db.query(updatePropByStatus, [status, id], (err, res) => {
            if (err) return result({
                status: 'error',
                message: err.message
            }, null)

            db.query(findPropById, [id], (err, data) => {
                if (err) return result({
                    status: 'error',
                    message: err.message
                }, null)

                if (!data.length)
                    return result({
                        status: 'error',
                        message: 'property not found'
                    }, null)

                result(null, {
                    status: 'success',
                    data
                })

            })
        })
    }

    static delete(id, result) {
        db.query(findPropById, [id], (err, data) => {
            if (err) return result({
                status: 'error',
                message: err.message
            }, null)

            if (!data.length)
                return result({
                    status: 'error',
                    message: 'property not found'
                }, null)

            db.query(deletePropById, [id], (err, res) => {
                if (err) return result({
                    status: 'error',
                    message: err.message
                }, null)


                result(null, {
                    status: 'success',
                    data
                })
            })
        })
    }

    static findById(id, result) {
        db.query(findPropById, [id], (err, data) => {
            if (err)
                return result({
                    status: 'error',
                    message: err.message
                }, null)
            else if (!data.length)
                return result({
                    status: 'error',
                    message: 'property not found'
                }, null)

            result(null, {
                status: 'sucess',
                data
            })

        })
    }

    static viewAll(result) {
        db.query(viewAll, (err, data) => {
            if (err)
                return result({
                    status: 'error',
                    message: err.message
                }, null)
            else if (!data.length)
                return result({
                    status: 'error',
                    message: 'data not found'
                }, null)

            result(null, {
                status: 'sucess',
                data
            })

        })
    }

    static findByType(type, result) {
        db.query(findPropByType, [type], (err, data) => {
            if (err)
                return result({
                    status: 'error',
                    message: 'data not found'
                }, null)

            result(null, {
                status: 'success',
                data
            })
        })
    }
}

module.exports = Property