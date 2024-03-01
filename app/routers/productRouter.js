const express = require("express");
const productController = require("../controllers/productController.js");
const productRouter = express.Router();
const mw = require("../middleware/auth.js")

productRouter.get('/:id', productController.getOne)
productRouter.get('/', productController.getProducts)
productRouter.put('/', mw.isAuth, mw.isAdmin, productController.editProduct)
productRouter.post('/', mw.isAuth, mw.isAdmin, productController.addProduct)

 
module.exports = productRouter;