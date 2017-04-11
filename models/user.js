var db = require('../others/db');

var User = db.sequelize.define('user', {
        id: {
            type: db.Sequelize.CHAR(3),
            primaryKey: true
        },
        username: {
            type: db.Sequelize.STRING(30),
            unique: true,
            allowNull: false
        },
        password: {
            type: db.Sequelize.STRING(30),
            allowNull: false
        }
    },
    {
        freezeTableName: true, // false will change 'user' to 'users'
        timestamps: false // no 'createdAt' and 'updateAt' column
    });

module.exports = User;