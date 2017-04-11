var conf = require('./config');
var Sequelize = require('sequelize');

var db={};

var sequelize = new Sequelize(conf.db.database,conf.db.user,conf.db.password,{
    host:conf.db.host,
    dialect: 'mysql',
    pool:{
        max:20,
        min:0,
        idle:30000
    }
});

db.Sequelize = Sequelize;
db.sequelize =sequelize;

module.exports = db;
