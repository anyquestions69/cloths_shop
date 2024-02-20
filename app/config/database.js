const Sequelize = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.DB_USER||'postgres'}:${process.env.DB_PASSWORD||'postgres'}@${process.env.DB_HOST||'localhost'}:5432/${process.env.DB_NAME||'postgres'}`)
module.exports = sequelize