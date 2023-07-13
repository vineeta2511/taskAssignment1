const jwt = require('jsonwebtoken')

const decodeToken = async (req, res, next) => {
  try {

    let authHeader = req.headers.Authorization || req.headers.authorization
    if (!authHeader && !authHeader.startsWith("Bearer")) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SECURED_KEY", (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('Unauthorized');
      }
      req.user = decoded.user;
      next();
    })
  }
  catch (err) {
    next(err);
  }
};

module.exports = { decodeToken }