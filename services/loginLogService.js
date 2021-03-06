var LoginLog = require('../models/loginLog');

module.exports = {
    createLog: function createLog(log) {
        return LoginLog.create({
            userId: log.userId,
            name: log.name,
            person: log.person,
            department: log.department,
            section: log.section,
            loginIp: log.loginIp,
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