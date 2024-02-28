const express = require("express");
const categoryController = require("../controllers/categoryController.js");
const categoryRouter = express.Router();
const mw = require("../middleware/auth.js")
 
categoryRouter.post('/',  mw.isAuth, mw.isAdmin, categoryController.addCategory)

categoryRouter.get('/:id', categoryController.getOne)
categoryRouter.put('/:id', mw.isAuth, mw.isAdmin, categoryController.editCategory)
categoryRouter.get('/', categoryController.getAll)

 
module.exports = categoryRouter;