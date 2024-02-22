const {Brand} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

class Manager{
    async getAll(req,res) {  
        try {
           
            let result= await Brand.findAll( )
           
            return res.send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async getOne(req,res){
        try {
            let brand = await Brand.findOne({where:{id:req.params['id']}})
            return res.send(brand)
        } catch (error) {
            return res.status(500).send(error)
        }
        
    }
    async getByName(req,res){
        try{
            let name = req.query.name
            let brand = await Brand.findAll({where:{
                name:{
                    [Op.like]:'%'+name+'%'
                }
            }})
            return res.send(brand)
        }catch(error){
            return res.status(500).send(error)
        }
    }
    async addBrand(req,res){
        try {
            let {name} = req.body
            let exist = await Brand.findOne({where:{name}})
            if(exist)return res.send("Такой бренд уже есть")
            let brand = await Brand.create({name})
            return res.send(brand)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async editBrand(req,res){
        try {
            let id = req.params.id
            let {name} = req.body
            let brand = await Brand.update({name}, {where:{id}})
            return res.send(brand)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async deleteBrand(req,res){
        try {
            let id = req.params.id
            await Brand.destroy({where:{id}})
            return res.send("Успешно удалено")
        } catch (error) {
            return res.status(500).send(error)
        }
    }
   
}
let manager = new Manager()
module.exports = manager