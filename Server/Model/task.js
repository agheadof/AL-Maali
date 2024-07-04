const Sequelize = require ('sequelize')
const sequelize = require ('../DB/dbservice')

const task = sequelize.define ('task' ,{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:true
    },
    title:{type:Sequelize.STRING,allowNull:true},
    deadline:{type:Sequelize.DATEONLY, allowNull:true},
    deadline_time:{type:Sequelize.TIME, allowNull:true},
    pages:{ type:Sequelize.INTEGER, allowNull:true},
    price:{type:Sequelize.INTEGER, allowNull:true},
    details:{type:Sequelize.TEXT, allowNull:true},
    file:{type:Sequelize.TEXT, allowNull:true},
    state:{type:Sequelize.INTEGER , allowNull:false , defaultValue:0},
    note:{type:Sequelize.STRING, allowNull:true},
    createdAt:{type:Sequelize.DATEONLY},
    client:{type:Sequelize.STRING, allowNull:true}
});


module.exports= task;