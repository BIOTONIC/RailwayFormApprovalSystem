var db = require('../others/db');

var mysql = db.mysql;

var App3 = mysql.sequelize.define('application3', {
        id: {
            type: mysql.Sequelize.STRING(13),
            primaryKey: true
        },
        workshop: {
            type: mysql.Sequelize.STRING(40),
            allowNull: false
        },
        telephone: {
            type: mysql.Sequelize.STRING(11),
            allowNull: false
        },
        fax: {
            type: mysql.Sequelize.STRING(11),
            allowNull: false
        },
        applyid: {
            type: mysql.Sequelize.STRING(13),
            allowNull: false
        },
        approveid: mysql.Sequelize.STRING(13),
        section: {
            type: mysql.Sequelize.STRING(50),
            allowNull: false
        },
        reason: {
            type: mysql.Sequelize.STRING(255),
            allowNull: false
        },
        sqstarttime: {
            type: mysql.Sequelize.STRING(14),
            allowNull: false
        },
        sqendtime: {
            type: mysql.Sequelize.STRING(14),
            allowNull: false
        },
        noticedepart: mysql.Sequelize.STRING(100),
        shigongfang: {
            type: mysql.Sequelize.STRING(200),
            allowNull: false
        },
        plan: {
            type: mysql.Sequelize.STRING(100),
            allowNull: false
        },
        techplan: {
            type: mysql.Sequelize.STRING(500),
            allowNull: false
        },
        secureplan: {
            type: mysql.Sequelize.STRING(500),
            allowNull: false
        },
        applytime: {
            type: mysql.Sequelize.STRING(14),
            allowNull: false
        },
        workshopmgr: mysql.Sequelize.STRING(50),
        workshopmgrtime: mysql.Sequelize.STRING(14),
        result: mysql.Sequelize.STRING(100),
        nextperson: {
            type: mysql.Sequelize.CHAR(1),
            allowNull: false,
            defaultValue: '1'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

mysql.sequelize.sync()
    .then(function () {
        console.log("App3 Sync Success");
    });

module.exports = App3;