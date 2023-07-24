const {bcrypt } = require('bcrypt');

const hashPassword = async(password) =>{
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword
};

const comparePassword = async(password, hashedPassword) =>{
    const isMatch = await bcrypt (password, hashedPassword);
    return isMatch;
}

module.exports = {hashPassword,comparePassword};