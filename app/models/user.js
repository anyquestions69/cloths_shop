const Sequelize = require("sequelize");
const sequelize = require('../config/database')


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
    },
    color:{
      type: Sequelize.STRING,
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

sequelize.sync({force: true}).then(async function (result){


    
})
.catch(err=> console.log(err));

module.exports = { User, Product, Category, Subcategory}