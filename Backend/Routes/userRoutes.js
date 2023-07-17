const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, getUser, getUsrById, updateUser,deleteUser} = require('../controllers/userController');

//const {decodeToken} = require("../middlewares/jwt")

userRouter.route ("/").get(getUser).post(signupUser).post(loginUser)
userRouter.route ("/:id").get(getUsrById).put(updateUser).delete(deleteUser)
//userRouter.get('/current', decodeToken, currentUser);
  
module.exports = userRouter;
