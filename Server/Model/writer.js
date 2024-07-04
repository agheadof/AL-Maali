const Sequelize = require('sequelize')
const sequelize = require('../DB/dbservice')

const writer = sequelize.define('writer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    phone: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.FLOAT, allowNull: false, defaultValue: 0.00 }
});

module.exports = writer;