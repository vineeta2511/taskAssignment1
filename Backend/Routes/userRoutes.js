const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel')
const { getUserController,
    signupUserController,
    loginUserController,
    logoutUserController,
    updatePasswordController,
    resetPasswordController,
    generateOtpContoller,
    updateUserController,
    deleteUseContoller} = require('../controllers/user/userController');

const paginatedResults = require('../middlewares/pagination');

userRouter.get('/viewuser', paginatedResults(User), getUserController);
//userRouter.get('/:id', getUsrById);

  
userRouter.post('/login', loginUserController);
userRouter.post('/signup', signupUserController);
userRouter.post('/generate-otp', generateOtpContoller);
userRouter.post('/logout', logoutUserController);
userRouter.post('/reset', resetPasswordController);
userRouter.post('/updatepassword', updatePasswordController);

userRouter.put('/:id', updateUserController);

userRouter.delete('/:id', deleteUseContoller);

module.exports = userRouter;
