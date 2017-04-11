var Workshop = require('../models/workshop');

module.exports = {
    findNameById: function findNameById(id) {
        return Workshop.findAll({
            attributes: ['name'],
            where: {
                id: id
            }
        });
    }
};
