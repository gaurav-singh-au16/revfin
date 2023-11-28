const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper')


const Rectangle = db.define('rectangles', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rectangle: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

module.exports = Rectangle