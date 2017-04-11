var Conf = require('../models/conf');

module.exports = {
    getCount: function getCount() {
        return Conf.findAll({
            attributes:['count']
        });
    }
}