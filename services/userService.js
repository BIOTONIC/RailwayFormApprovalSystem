var User = require('../models/user');

module.exports = {
    findUserByName: function findUserByName(username) {
        return User.findAll({
            where: {
                username: username
            }
        });
    }
};