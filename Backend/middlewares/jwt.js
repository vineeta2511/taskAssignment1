const jwt = require('jsonwebtoken')
const SECURED_KEY = "what is the Screte Key";

const generateAccessToken = async (user) => {
    
    const accessToken = jwt.sign(
        {
            user: {
                email: user.email,
                role:user.role

            },
        }, SECURED_KEY, { expiresIn: '1h' });

    return accessToken; 
}

const decodeToken = (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, SECURED_KEY);
      return decoded.user.role;
    } catch (error) {
      return null;
    }
  };

module.exports = { generateAccessToken,decodeToken }