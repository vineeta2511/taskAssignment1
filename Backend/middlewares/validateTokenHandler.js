const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) {
      res.status(401);
      throw new Error("Unauthorized: No token provided.");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        console.log("err:", err);
        res.status(401);
        throw new Error("Unauthorized: Invalid Token.");
      }
      req.user = decoded.user;

      next();
    });
  } catch (error) {
    console.error("Error1:", error.message);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = verifyToken;
