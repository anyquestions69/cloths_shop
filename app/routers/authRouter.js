const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
 
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/check', userController.check)

 
module.exports = userRouter;