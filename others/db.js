var conf = require('./config');
var Sequelize = require('sequelize');
var mssql = require('mssql');

var mysql = {};
var sequelize = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.password, {
    host: conf.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 30000
    }
});

mysql.Sequelize = Sequelize;
mysql.sequelize = sequelize;

module.exports = {mysql, mssql};