const {Category} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

class Manager{
    async getAll(req,res) {  
        try {
           
            let result= await Category.findAll( )
           
            return res.send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async getOne(req,res){
        try {
            let category = await Category.findOne({where:{id:req.params['id']}})
            return res.send(category)
        } catch (error) {
            return res.status(500).send(error)
        }
        
    }
    async getByName(req,res){
        try{
            let name = req.query.name
            let category = await Category.findAll({where:{
                name:{
                    [Op.like]:'%'+name+'%'
                }
            }})
            return res.send(category)
        }catch(error){
            return res.status(500).send(error)
        }
    }
    async addCategory(req,res){
        try {
            let {name} = req.body
            let exist = await Category.findOne({where:{name}})
            if(exist)return res.send("Такая категория уже есть")
            let category = await Category.create({name})
            return res.send(category)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async editCategory(req,res){
        try {
            let id = req.params.id
            let {name} = req.body
            let category = await Category.update({name}, {where:{id}})
            return res.send(category)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    async deleteCategory(req,res){
        try {
            let id = req.params.id
            await Category.destroy({where:{id}})
            return res.send("Успешно удалено")
        } catch (error) {
            return res.status(500).send(error)
        }
    }
   
}
let manager = new Manager()
module.exports = manager