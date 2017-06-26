var db = require('../others/db');

var mysql = db.mysql;

var User = mysql.sequelize.define('user', {
        id: {
            type: mysql.Sequelize.CHAR(10),
            primaryKey: true
        },
        username: {
            type: mysql.Sequelize.STRING(30),
            unique: true,
            allowNull: false
        },
        password: {
            type: mysql.Sequelize.STRING(30),
            allowNull: false
        }
    },
    {
        freezeTableName: true, // false will change 'user' to 'users'
        timestamps: false // no 'createdAt' and 'updateAt' column
    });

mysql.sequelize.sync()
    .then(function () {
        console.log("User Sync Success");
    });

module.exports = User;