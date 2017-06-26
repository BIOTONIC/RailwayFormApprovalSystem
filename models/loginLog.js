var db = require('../others/db');

var mysql = db.mysql;

var LoginLog = mysql.sequelize.define('loginLog', {
    id: {
        type: mysql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: mysql.Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: mysql.Sequelize.STRING(30),
        allowNull: false
    },
    person: {
        type: mysql.Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: '0'
    },
    workshop: {
        type: mysql.Sequelize.STRING(40)
    },
    section: {
        type: mysql.Sequelize.STRING(40)
    },
    loginTime: {
        type: mysql.Sequelize.STRING(14),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

mysql.sequelize.sync()
    .then(function () {
        console.log("LoginLog Sync Success");
    });

module.exports = LoginLog;