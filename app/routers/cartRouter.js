const express = require("express");
const cartController = require("../controllers/cartController.js");
const cartRouter = express.Router();
const mw = require("../middleware/auth.js")
 
cartRouter.post('/add',  cartController.addProduct)
cartRouter.get('/view', cartController.getCart)

 
module.exports = cartRouter;