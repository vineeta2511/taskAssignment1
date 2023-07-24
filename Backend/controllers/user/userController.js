const dotenv = require('dotenv');
dotenv.config();

const { getUser,
    signupUser,
    loginUser,
    updatePassword,
    logoutUser,
    resetPassword,
    updateUser,
    deleteUser } = require("./userServices");
const { generateAccessToken } = require('../../utils/tokenUtils');

const signupUserController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            throw new Error('All fields are required.');
        }
        const hashedPassword = await hashPassword(password);

        const user = await signupUser({ username, email, password: hashedPassword, role })
        if (user) {
            res.status(201).json({ _id: user._id, email: user.email, role: user.role })
        } else {
            throw new Error('User not valid.');
        }
    }
    catch (error) {
        console.log('Error in SignUp process', error);
        res.status(500).json({ errorMessage: 'Failed to SignUp.' });

    }
}

const loginUserController = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error ('All fields are mandatory!');
        }
        const user = await loginUser({email,password});
        const accessToken = generateAccessToken({
            user:{
                id: user._id,
                email:user.email,
                role:user.role,
            }
        })
    }
}




















module.exports = {};
