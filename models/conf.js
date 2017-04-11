var db = require('../others/db');

var Conf = db.sequelize.define('conf', {
        count: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true
        }
    },
    {
        freezeTableName: true, // false will change 'user' to 'users'
        timestamps: false // no 'createdAt' and 'updateAt' column
    });

module.exports = Conf;