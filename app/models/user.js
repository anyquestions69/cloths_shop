const Sequelize = require("sequelize");
const sequelize = require('../config/database')
var crypto = require('crypto');
var key = crypto.createCipher('aes-128-cbc', process.env.CRYPT_KEY);

const User = sequelize.define("user", {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false
    },
    isAdmin:{
      type:Sequelize.BOOLEAN,
      default:false
    }
  },{
    timestamps: false
  });

  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT
    }
  },{
    timestamps: false
  });
  const Category = sequelize.define('category', {
    name:{
      type:Sequelize.TEXT
    }
  },{
    timestamps: false
  })
  const Subcategory = sequelize.define('subcategory', {
    name:{
      type:Sequelize.STRING
    }
  },{
    timestamps: false
  }) 


  Category.hasMany(Subcategory, { onDelete: "cascade" })
  Category.hasMany(Product, { onDelete: "cascade" })
  Subcategory.hasMany(Product, { onDelete: "cascade" })
  const cat = [{name:"Одежда"},{name:"Обувь"}, {name:"Аксессуары"}]
const subcat = [{name: "Свободно"}, {name: "Ожидает подтверждения"}, {name:"Забронирован"}]

sequelize.sync({force: false}).then(async function (result){
  if((await Category.findAll()).length==0)
  await Category.bulkCreate(cat, { validate: true })
if((await Subcategory.findAll()).length==0)
 await Subcategory.bulkCreate(subcat, { validate: true })
if(!(await User.findOne({where:{email:process.env.ADMIN_EMAIL}}))){
  var hashedPass = key.update(process.env.ADMIN_PASSWORD, 'utf8', 'hex')
  hashedPass+=key.final('hex');
 await User.create({email:process.env.ADMIN_EMAIL, password:hashedPass, firstname:"Dan", lastname:"Ivanov", isAdmin:true})
}

    
})
.catch(err=> console.log(err));

module.exports = { User, Product, Category, Subcategory}