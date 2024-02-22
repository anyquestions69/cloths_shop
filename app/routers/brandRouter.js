const express = require("express");
const brandController = require("../controllers/brandController.js");
const brandRouter = express.Router();
const mw = require("../middleware/auth.js")
 
brandRouter.post('/',  mw.isAuth, mw.isAdmin, brandController.addBrand)

brandRouter.get('/:id', brandController.getOne)
brandRouter.put('/:id', mw.isAuth, mw.isAdmin, brandController.editBrand)
brandRouter.get('/', brandController.getAll)

 
module.exports = brandRouter;