const Sequelize = require ('sequelize')
const sequelize = require ('../DB/dbservice')

const log = sequelize.define ('log' ,{
    id:{type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    title:{type:Sequelize.STRING,allowNull:true},
    pages:{ type:Sequelize.INTEGER, allowNull:true},
    price:{type:Sequelize.INTEGER, allowNull:true},
    writerId:{type:Sequelize.INTEGER, allowNull:true}
   
});


module.exports= log;