const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const decodeToken = async (req, res, next) => {
  try {

    let authHeader = req.headers.Authorization || req.headers.authorization
  
    //const token = authHeader.split(" ")[1];
    jwt.verify(authHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) { 
        console.log("err:",err);
        res.status(401);
        throw new Error('Unauthorized');
       
      }
      req.user = decoded.user;
      next();
    })
  }
  catch (err) {
    console.error(err);
    res.status(401).json({ errormessage: 'Unauthorized' });
  }
};

module.exports = { decodeToken }