const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel')
const { signupUser, loginUser, getUser, updateUser, deleteUser, updatePassword, logoutUser, generateOtp, resetPassword} = require('../controllers/userController');

const paginatedResults = require('../middlewares/pagination');

userRouter.get('/viewuser', paginatedResults(User), getUser);
//userRouter.get('/:id', getUsrById);
//userRouter.get('/tech',getTech)

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/generate-otp', generateOtp);
userRouter.post('/logout', logoutUser);
userRouter.post('/reset', resetPassword);
userRouter.post('/updatepassword', updatePassword);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
