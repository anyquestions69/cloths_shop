const {User} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: users } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, users, totalPages, currentPage };
  };

class Manager{
   
    async getOne(req,res){
        let user = await User.findOne({where:{id:req.params['id']}})
        return res.send(user)
    }

    async getAll(req,res){
        let page=req.query.page
        var limit =5
        let result= await User.findAndCountAll( {offset: page>=1?((page-1)*2):0, limit: limit})
        let resData= getPagingData(result, page, limit)
        return res.send(resData)
    }

    async register(req, res){
        try{
            let {firstname, lastname, email, password,repass} = req.body
            if(email)
                if(email.replace(' ','')=='')
                    return res.status(401).send({error:'Заполните email'})
            let re = /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g
            if(re.test(email) | re.test(password))
                return res.status(401).send({error:'Не пытайтесь взломать нас'})
            if(repass!=password)
                return res.status(401).send({error:'Пароли не совпадают'})
           
            let exists = await User.findOne({where:{email:email}})
            if(exists)
                return res.status(401).send({error:'Пользователь с таким именем уже существует. Попросите администратора удалить Ваш старый аккаунт прежде чем создавать новый.'})
           
            let user = await User.create({
                firstname,
                lastname,
                email:email,
                password,
                
            })
            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '14400s' });
            return res.cookie('user',token, { maxAge: 9000000, httpOnly: true }).send({token:token})
        }catch(e){
            console.log(e)
            return res.status(404).send({error:'Ошибка'})
        }
    }

    async login(req,res){
        try{
            let {email, password} = req.body
            let user = await User.findOne({where:{email}})
            
            if(!user)
                return res.status(401).send({error:'Такого email не существует'})
            if(bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '14400s' });
                return res.cookie('user',token, { maxAge: 9000000, httpOnly: true }).send({token})
            }else{
                return res.status(404).send({error:'Неверный пароль'})
            }
        }catch(e){
            return res.status(404).send({error:'Неверный пароль'})
        }
    }

    async logout(req,res){
        return res.clearCookie("user").status(200);
    }


    async update(req,res){
        try {
            let {firstname, lastname, password} = req.body
            if(name){
                if(name.replace(' ','')=='')
                    return res.status(401).send('Заполните ФИО')
            }
            let re = /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g
            if(re.test(name) | re.test(password))
                return res.status(401).send('Не пытайтесь взломать нас')
            
                let usr = await User.update({name:name},{where:{id:req.user.id}})
                return res.send(usr)
        
        } catch (error) {
            return res.status(404).send('Неверный пароль')
        }
    }
    async deleteAccount(req,res){
        let user = await User.destroy({where:{id:req.params['id']}})
        //await web3.eth.accounts.wallet.remove(user.wallet)
        return res.redirect('/admin')
    }
    async check(req,res){
        try {
            const token = req.cookies.user
            if (token == null) return res.sendStatus(401)
            await jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
                if (err) return res.sendStatus(403)
                let exists = await User.findOne({where:{id:user.id}})
                if(exists){
                    return res.send({email:user.email})
                }else{
                    return res.sendStatus(403)
                }
            })
        } catch (error) {
            return res.sendStatus(400)
        }
    }
    
}
let manager = new Manager()
module.exports = manager