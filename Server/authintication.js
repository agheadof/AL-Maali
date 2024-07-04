const jwt = require('jsonwebtoken')

exports.wr_auth = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(403).json("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next();
    }
    catch (err) {
        res.status(403).json("Forbidden")
    }
}

exports.DE_auth = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(403).json("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_dataEntry)
        req.DE_user = verified
        next();
    }
    catch (err) {
        res.status(403).json("Forbidden")
    }
}