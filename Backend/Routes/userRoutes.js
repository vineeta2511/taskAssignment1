const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, getUser, getUsrById, updateUser, deleteUser, forgetPassword, updatePassword, logoutUser } = require('../controllers/userController');



userRouter.get('/', getUser);
userRouter.get('/:id', getUsrById);

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/generate-otp', forgetPassword);
userRouter.post('/logout',logoutUser)

userRouter.put('/:id', updateUser);
userRouter.put('/updatepassward', updatePassword)

userRouter.delete('/:id', deleteUser);



module.exports = userRouter;
