const Sequelize = require('sequelize');
const sequelize = new Sequelize('almaali' , 'root' , '' , {port: '3306',host: 'localhost', dialect:'mysql', define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true,
  },
  
  timezone: '+03:00',
  logging:false});

  module.exports = sequelize;