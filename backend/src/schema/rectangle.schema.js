const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper')


const Rectangle = db.define('rectangles', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    template_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false
    },
    width: {
        type: DataTypes.STRING,
        allowNull: false
    },
    x: {
        type: DataTypes.STRING,
        allowNull: false
    },
    y: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stroke: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

module.exports = Rectangle