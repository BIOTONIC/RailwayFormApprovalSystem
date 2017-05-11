var conf = require('./config');
var Sequelize = require('sequelize');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var mysql = {};
var sqlserver = {};

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

sqlserver.conection = new Connection(conf.sqlserver);
sqlserver.request = Request;

module.exports = {mysql, sqlserver};
