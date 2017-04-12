var db = require('../others/db');

var Conf = db.sequelize.define('conf', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true
        },
        applycount: {
            type: db.Sequelize.INTEGER(11)
        },
        approvecount: {
            type: db.Sequelize.INTEGER(11)
        }
    },
    {
        freezeTableName: true, // false will change 'user' to 'users'
        timestamps: false // no 'createdAt' and 'updateAt' column
    });

module.exports = Conf;