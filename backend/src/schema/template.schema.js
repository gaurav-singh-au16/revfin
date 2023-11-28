const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper')


const Template = db.define('templates', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    }
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

module.exports = Template