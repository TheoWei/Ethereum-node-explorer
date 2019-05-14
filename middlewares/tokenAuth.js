const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req, res, next) => {
    try{
        const {key} = req.query; 
        const decode = jwt.verify(key, config.secret);
        req.userData = decode;
        next();
    }catch(err){
        res.status(500).json({message: 'token invalid!'});
    }
}