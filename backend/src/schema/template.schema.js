const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper');
const Rectangle = require('./rectangle.schema');


const Template = db.define('templates', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

Rectangle.belongsTo(Template, { foreignKey: 'template_id' })

Template.hasMany(Rectangle, { foreignKey: 'template_id' })

module.exports = Template