const Sequelize = require('sequelize')
const sequelize = require('../DB/dbservice')
const data_entry = sequelize.define(
    'data_entry',
    {
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
        email: { type: Sequelize.STRING, allowNull: false, unique:true },
        password: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.STRING, allowNull: false },
        Admin: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false }

    }
);
module.exports = data_entry;