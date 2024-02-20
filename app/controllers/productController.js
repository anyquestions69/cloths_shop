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
        let {id, cat_1, district, activities, days, status, type, schedule,page}=req.query
            let filter =[]
            let exclude
            
            if(id){
                if(!isNaN(id) && !isNaN(parseInt(id))){
                    filter.push({id:id})
                }else{
                    let arr = id.split(',')
                    console.log(arr)
                    if(id.includes(',')){
                    
                    let obj=[]
                    for(let a=0; a<arr.length;a++){
                        obj.push({[Op.substring]: arr[a]})
                    }
                    console.log(obj)
                    filter.push({activity:{
                        [Op.or]: obj
                    }})
                    }else{
                        filter.push({activity:{
                            [Op.substring]: id
                        }})
                    }
                }
            }
            if(activities){
                filter.push({activity:{
                    [Op.or]:activities.split(',')
                }})
            }
            
            if(district){
                filter.push({district:{
                    [Op.substring]: district
                }})
            }
            
            if(status==='true'){
                const today = new Date()
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; 
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                let avMonths=[]
                for(let i =today.getMonth()-1 ;i<=12;i++){ // +1
                    if (i < 10) i = '0' + i;
                    avMonths.push({[Op.substring]:i+'.'+yyyy})
                }
                filter.push({schedule_1:{
                    [Op.or]:avMonths
                }})
            }
            if(cat_1){
                console.log(cat_1)
                filter.push({cat_1:{
                    [Op.or]:cat_1.split(',')
                }})
            }
            
            if(days){
                let arr = days.split(',')
                let ar_obj=[]
                for(let i=0; i< arr.length;i++){
                    ar_obj.push({[Op.regexp]: `2023, [а-яА-Я|.|, ]*${arr[i]}` })
                }
                filter.push({schedule_1:{
                    [Op.or]: ar_obj 
                }})
            }
            if(type){
                if(type==1){
                    filter.push({activity:{
                    [Op.notLike]:'ОНЛАЙН%'
                    }})
                }else if(type==2){
                    filter.push({activity:{
                        [Op.like]:'ОНЛАЙН%'
                        }})
                    exclude =  {exclude: ['address']}
                }
            }



            let result

            if(filter.length>1){
             result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:{
                [Op.and]: filter
                }})
            }else{
                result= await Product.findAndCountAll( {offset: page>=1?((page-1)*10):0, limit: 10, where:filter[0], attributes:exclude})
                    //console.log(result)
            }
            let resData= getPagingData(result, page, 10)
            for(let i=0;i<resData.Products.length;i++){
                //console.log(resData.Products[i].activity)
                //dadata.address({ query: resData.Products[i].address, count: 1 }).then(r=>console.log(r)).catch(err=>console.log(err))
            }
            return res.send(resData)

    }
    async getOne(req,res){
        let act = await Product.findOne({where:{id:req.params['id']}})
        return res.send(act)
    }
   
}
let manager = new Manager()
module.exports = manager