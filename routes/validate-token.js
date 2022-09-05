const jwt = require('jsonwebtoken')

const verifyFotken = (req, res, next) =>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(400).json({
            error: 'Acceso denegado'
        })
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch(error){
        res.status(400).json({
            error: 'Token invalido'
        })
    }
}

module.exports = verifyFotken