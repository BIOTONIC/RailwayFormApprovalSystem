var db = require('../others/db');

var mysql = db.mysql;

var OperationLog = mysql.sequelize.define('operationLog', {
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
    loginIp: {
        type: mysql.Sequelize.STRING(40),
        allowNull: false
    },
    operationTime: {
        type: mysql.Sequelize.STRING(14),
        allowNull: false
    },
    operationDesc: {
        type: mysql.Sequelize.STRING(40),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

mysql.sequelize.sync()
    .then(function () {
        console.log("OperationLog Sync Success");
    });

module.exports = OperationLog;