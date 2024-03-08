const {Product, Subcategory, Category, Brand, Size, ProdSize, Image, SizeGroup} = require('../models/user')
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
            let {name, cat, subcat, brand, page}=req.query
            let filter =[]
            let exclude
            if(req.query){
                if(cat.trim().length != 0 &&cat!==null){
                    if(cat.split(',')===Array && cat.split(',').length>1){
                        filter.push({categoryId:{
                            [Op.or]:cat.split(',')
                        }})
                    }else{
                        filter.push({categoryId:cat.split(',')[0]
                        })
                    }
                    
                }
                if(subcat.trim().length != 0 &&subcat!==null){
                    if(subcat.split(',')===Array && subcat.split(',').length>1){
                        filter.push({subcategoryId:{
                            [Op.or]:subcat.split(',')
                        }})
                    }else{
                        filter.push({subcategoryId:subcat.split(',')[0]
                        })
                    }
                    
                }
                if(name.trim().length != 0 &&name!==null){
                    filter.push({name:{
                    [Op.iLike]:'%'+name+'%'
                    }})
                }
                if(brand.trim().length != 0 &&brand!==null&&brand!=''){
                    
                    if( brand.split(',').length>1){
                        filter.push({brandId:{
                            [Op.or]:brand.split(',')
                        }})
                    }else{
                        filter.push({brandId:brand.split(',')[0]
                        })
                    }
                    
                }
            }
           
            let result

            if(filter.length>1){
             result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:{
                [Op.and]: filter
                }, include: [Image, Size]})
            }else if(filter.length==1){
                result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:filter[0], include: [Image, Size]})
            }else{
                result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, include: [Image, Size]})
            }
            let resData= getPagingData(result, page, 10)
            return res.send(resData)
        } catch (error) {
            return res.status(501).send(error)
        }
    }
    async getOne(req,res){
        try {
            console.log(req.params)
            let act = await Product.findOne({where:{id:req.params['id']}, include:[
                Subcategory, Category, Brand,  {model:ProdSize, include:{model:Size, include:SizeGroup}}, Image]
             })
            return res.send(act)
        } catch (error) {
            console.log(error)
            return res.status(501).send(error)
        }
        
    }
    async addProduct(req,res){
        try {
            let {name, description, price, categoryId, subcategoryId, sizes, prodsize} = req.body
            console.log(req.body)
            let product = await Product.create({name, description,price, categoryId:1, subcategoryId:1, brandId:1})
            
            if( req.files){
                for(let img of  req.files){
                    
                    let resImg = await Image.create({name:img.filename, productId:product.id})
                }
            }
            
            let size = await Size.bulkCreate(sizes, {fields:['name'],updateOnDuplicate:['name']})
            console.log(sizes)
            for(let s of sizes){
                await product.addSize(s, {through:{count:1}})
            }
            product = await product.save()
            return res.send(product)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    async editProduct(req,res){
        try {
            let id = req.params.id
            let {name, description, price, categoryId, subcategoryId} = req.body
            let product = await Category.update({name,description, price, categoryId, subcategoryId}, {where:{id}})
            return res.send(product)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
   
}
let manager = new Manager()
module.exports = manager