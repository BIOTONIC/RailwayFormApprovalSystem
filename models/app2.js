var db = require('../others/db');

var App2 = db.sequelize.define('application2', {
        id: {
            type: db.Sequelize.STRING(13),
            primaryKey: true
        },
        workshop: {
            type: db.Sequelize.CHAR(2),
            allowNull: false
        },
        telephone: {
            type: db.Sequelize.STRING(11),
            allowNull: false
        },
        fax: {
            type: db.Sequelize.STRING(11),
            allowNull: false
        },
        applyid: {
            type: db.Sequelize.STRING(13),
            allowNull: false
        },
        approveid: db.Sequelize.STRING(13),
        section: {
            type: db.Sequelize.STRING(50),
            allowNull: false
        },
        reason: {
            type: db.Sequelize.STRING(255),
            allowNull: false
        },
        sqstarttime: {
            type: db.Sequelize.STRING(14),
            allowNull: false
        },
        sqendtime: {
            type: db.Sequelize.STRING(14),
            allowNull: false
        },
        noticedepart: db.Sequelize.STRING(100),
        shigongfang: {
            type: db.Sequelize.STRING(200),
            allowNull: false
        },
        plan: {
            type: db.Sequelize.STRING(100),
            allowNull: false
        },
        techplan: {
            type: db.Sequelize.STRING(500),
            allowNull: false
        },
        secureplan: {
            type: db.Sequelize.STRING(500),
            allowNull: false
        },
        applytime: {
            type: db.Sequelize.STRING(14),
            allowNull: false
        },
        workshopmgr: db.Sequelize.STRING(50),
        workshopmgrtime: db.Sequelize.STRING(14),
        result: db.Sequelize.STRING(100),
        nextperson: {
            type: db.Sequelize.CHAR(1),
            allowNull: false,
            defaultValue: '1'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

module.exports = App2;
