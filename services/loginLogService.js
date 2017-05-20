var LoginLog = require('../models/loginLog');

module.exports = {
    createLog: function createLog(log) {
        return LoginLog.create({
            userId: log.userId,
            name: log.name,
            person: log.person,
            workshop: log.workshop,
            section: log.section,
            loginTime: log.loginTime,
        });
    },
    findLogs: function findLogs(query, order) {
        return LoginLog.findAll({
            where: query,
            order: order
        });
    }
};