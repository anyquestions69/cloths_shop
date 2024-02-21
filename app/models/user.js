const Sequelize = require("sequelize");
const sequelize = require('../config/database')
const bcrypt = require("bcrypt");

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
      allowNull:false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(8)));
      }
    },
    isAdmin:{
      type:Sequelize.BOOLEAN,
      defaultValue:false,
      allowNull:false
    }
  },{
    timestamps: false,
    instanceMethods: {
      validPassword(password) {
          return bcrypt.compareSync(password, this.password);
      }
  }
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

 await User.create({email:process.env.ADMIN_EMAIL, password:process.env.ADMIN_PASSWORD, firstname:"Dan", lastname:"Ivanov", isAdmin:true})
}

    
})
.catch(err=> console.log(err));

module.exports = { User, Product, Category, Subcategory}