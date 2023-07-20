const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel')
const { signupUser, loginUser, getUser, getUsrById, updateUser, deleteUser, updatePassword, logoutUser, generateOtp, resetPassword } = require('../controllers/userController');

const paginatedResults = require('../middlewares/pagination');

userRouter.get('/',paginatedResults(User), getUser);
userRouter.get('/:id', getUsrById);


userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/generate-otp', generateOtp);
userRouter.post('/logout', logoutUser)
userRouter.post('/reset', resetPassword)

userRouter.put('/:id', updateUser);
userRouter.post('/updatepassword', updatePassword)

userRouter.delete('/:id', deleteUser);



module.exports = userRouter;
