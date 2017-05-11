var db = require('../others/db');

var mysql = db.mysql;

var Workshop = mysql.sequelize.define('workshop', {
        id: {
            type: mysql.Sequelize.CHAR(2),
            primaryKey: true
        },
        name: {
            type: mysql.Sequelize.STRING(10),
            unique: true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

module.exports = Workshop;