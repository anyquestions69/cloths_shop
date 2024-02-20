const express = require("express");
const productController = require("../controllers/productController.js");
const productRouter = express.Router();
 
productRouter.get('/cat/show', productController.getActCat)
productRouter.get('/dst/show', productController.getDistrics)
productRouter.get("/", productController.getGroups);
productRouter.get('/:id', productController.getOne)

 
module.exports = productRouter;