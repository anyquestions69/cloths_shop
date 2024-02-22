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
    
    async getCart(req,res){
        try {
            
            return res.send({cart: req.session.cart, price:req.session.cart_price})
        } catch (error) {
            return res.status(500).send(error)
        }
        
    }
    async addProduct(req,res){
        try {
            if(!req.session.cart)
            {
                req.session.cart = [];
            }
            if(!req.session.cart_price)req.session.cart_price=0
           
            let {id} = req.body
           
            let count = 0;

            for(let i = 0; i < req.session.cart.length; i++)
            {

                if(parseInt(req.session.cart[i].id) == parseInt(id))
                {
                    count++;
                    req.session.cart[i].count++
                    req.session.cart_price+=req.session.cart[i].price
                }

            }
            if(count==0){
                let product = await Product.findByPk(parseInt(id))
                const cart_data = {
                    id:product.id,
                    name:product.name,
                    description : product.description,
                    price:product.price,
                    count : 1
                }

                req.session.cart.push(cart_data);
                req.session.cart_price+=cart_data.price
            }
           
            return res.send({cart: req.session.cart, price:req.session.cart_price})
        } catch (error) {
            return res.status(500).send(error)
        }
    }
   
}
let manager = new Manager()
module.exports = manager