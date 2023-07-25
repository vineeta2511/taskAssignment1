const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    return accessToken;
};

module.exports = { generateAccessToken };