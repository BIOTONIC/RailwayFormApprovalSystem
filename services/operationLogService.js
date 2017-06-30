var OperationLog = require('../models/operationLog');

module.exports = {
    createLog: function createLog(log) {
        return OperationLog.create({
            userId: log.userId,
            name: log.name,
            person: log.person,
            loginIp: log.loginIp,
            operationTime: log.operationTime,
            operationDesc: log.operationDesc
        });
    },
    findLogs: function findLogs(query, order) {
        return OperationLog.findAll({
            where: query,
            order: order
        });
    }
};