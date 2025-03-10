const jwt = require('jsonwebtoken');
require("dotenv").config();
const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if(decodedToken){
        req.body.user=decodedToken.userId
        next()
       
      }else{
        return res.status(401).send('Please login again');
      }

    }else{
        return res.status(401).send('Please login again');
    }
};

module.exports = {authMiddleware};