const {Product} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

   

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: Products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, Products, totalPages, currentPage };
  };
  

class Manager{
    async getProducts(req,res) {  
        try {
            let {name, category, subcategory, brand, page}=req.query
            let filter =[]
            let exclude
            
            if(category){
                console.log(category)
                filter.push({categoryId:{
                    [Op.or]:category.split(',')
                }})
            }
            
            if(name){
                filter.push({name:{
                [Op.like]:'%'+name+'%'
                }})
            }
            let result

            if(filter.length>1){
             result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:{
                [Op.and]: filter
                }})
            }else{
                result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:filter[0], attributes:exclude})
            }
            let resData= getPagingData(result, page, 10)
            return res.send(resData)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    async getOne(req,res){
        try {
            let act = await Product.findOne({where:{id:req.params['id']}})
            return res.send(act)
        } catch (error) {
            return res.status(400).send(error)
        }
        
    }
    async addProduct(req,res){
        try {
            let {name, description, price, categoryId, subcategoryId} = req.body
            let product = await Product.create({name, description,price, categoryId, subcategoryId})
            return res.send(product)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    async editProduct(req,res){
        try {
            let id = req.params.id
            let {name, description, price, categoryId, subcategoryId} = req.body
            let product = await Product.create({name, description,price, categoryId, subcategoryId})
            return res.send(product)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
   
}
let manager = new Manager()
module.exports = manager