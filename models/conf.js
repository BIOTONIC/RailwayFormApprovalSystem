var db = require('../others/db');

var mysql = db.mysql;

var Conf = mysql.sequelize.define('conf', {
        id: {
            type: mysql.Sequelize.INTEGER(11),
            primaryKey: true
        },
        applycount: {
            type: mysql.Sequelize.INTEGER(11)
        },
        approvecount: {
            type: mysql.Sequelize.INTEGER(11)
        }
    },
    {
        freezeTableName: true, // false will change 'user' to 'users'
        timestamps: false // no 'createdAt' and 'updateAt' column
    });

var mssql = db.mysql;

module.exports = Conf;