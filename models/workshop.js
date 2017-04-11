var db = require('../others/db');

var Workshop = db.sequelize.define('workshop', {
        id: {
            type: db.Sequelize.CHAR(2),
            primaryKey: true
        },
        name: {
            type:db.Sequelize.STRING(10),
            unique: true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

module.exports = Workshop;