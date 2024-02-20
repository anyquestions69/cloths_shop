const express = require("express");
const productController = require("../controllers/productController.js");
const productRouter = express.Router();
 

productRouter.get('/:id', productController.getOne)
productRouter.get('/', productController.getProducts)

 
module.exports = productRouter;