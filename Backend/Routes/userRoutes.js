const express = require('express');
const userRouter = express.Router();
const {signupUser,loginUser, getUser, getUsrById}= require('../controllers/userController');

userRouter.post('/signup',signupUser);
userRouter.get('/view',getUser);
userRouter.get('/viewbyid',getUsrById)

userRouter.post('/login',loginUser);

module.exports = {userRouter};
