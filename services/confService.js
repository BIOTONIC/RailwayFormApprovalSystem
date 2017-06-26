var Conf = require('../models/conf');

module.exports = {
    getApplyCount: function getApplyCount() {
        return Conf.findAll({
            attributes: ['applycount'],
            where: {id: 0}
        });
    },
    getApproveCount: function getApproveCount() {
        return Conf.findAll({
            attributes: ['approvecount'],
            where: {id: 0}
        });
    }
}