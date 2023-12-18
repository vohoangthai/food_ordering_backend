const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    if(typeof req.headers.token === 'string'){

        const token = req.headers.token.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'The authemtication 1',
                    status: 'ERROR'
                })
            }
            if (user?.isAdmin) {
                next()
            } else {
                return res.status(404).json({
                    message: 'The authemtication 2',
                    status: 'ERROR'
                })
            }
        });
    }
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication 3',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication 4',
                status: 'ERROR'
            })
        }
    });
}
const authEmployeeMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication 5',
                status: 'ERROR'
            })
        }
        if (user?.isEmployee ) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication 6',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    authEmployeeMiddleWare
}