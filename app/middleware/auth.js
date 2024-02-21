const {User} = require('../models/user')
const config = process.env;
const jwt = require('jsonwebtoken')

class Auth{
    
    async isAuth(req,res,next){

        const token = req.cookies.user
        if (token == null) return res.sendStatus(401)

        await jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
           
            if (err) return res.sendStatus(403)
            let exists = await User.findOne({where:{id:user.id}})
            if(exists){
                req.user = exists
                next()
            }else{
                return res.sendStatus(403)
            }
        })
        
    }
    async isAdmin(req,res,next){
        if(!req.user.isAdmin){
            return res.status(403).send('Не админ')
        }
            next()
    }
}
module.exports = new Auth()