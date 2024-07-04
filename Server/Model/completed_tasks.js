const Sequelize = require('sequelize')
const sequelize = require('../DB/dbservice')

const completed_tasks = sequelize.define('completed_tasks', {
    id:{type:Sequelize.INTEGER, autoIncrement:true, primaryKey:true, allowNull:false},
    file_path:{type:Sequelize.STRING}
})
module.exports=completed_tasks;