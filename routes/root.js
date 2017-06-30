var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getFormatTime = require('../others/util').getFormatTime;
var getNormalTime = require('../others/util').getNormalTime;
var loginLogService = require('../services/loginLogService');
var operationLogService = require('../services/operationLogService');

router.get('/', isLogin, function (req, res, next) {
    res.locals.popup = false;
    res.render('root');
});

router.get('/loginLog', isLogin, function (req, res, next) {
    res.locals.loginLogs = [];
    res.render('loginLog');
});

router.get('/loginLog/query', isLogin, function (req, res, next) {
    var starttime = getFormatTime(req.query.starttime);
    var endtime = getFormatTime(req.query.endtime);

    var order = [['id', 'DESC']];
    var query = {};

    if (starttime != '' && endtime != '') {
        query = {loginTime: {$gte: starttime}, loginTime: {$lte: endtime}};
    } else if (starttime == '' && endtime != '') {
        query = {loginTime: {$lte: endtime}};
    } else if (starttime != '' && endtime == '') {
        query = {loginTime: {$gte: starttime}};
    }

    loginLogService.findLogs(query, order).then((results) => {
        for (var i = 0; i < results.length; i++) {
            results[i].loginTime = getNormalTime(results[i].loginTime);
        }
        res.locals.loginLogs = results;
        res.render('loginLog');
    });
});

router.get('/operationLog', isLogin, function (req, res, next) {
    res.locals.operationLogs = [];
    res.render('operationLog');
});

router.get('/operationLog/query', isLogin, function (req, res, next) {
    var starttime = getFormatTime(req.query.starttime);
    var endtime = getFormatTime(req.query.endtime);

    var order = [['id', 'DESC']];
    var query = {};

    if (starttime != '' && endtime != '') {
        query = {operationTime: {$gte: starttime}, operationTime: {$lte: endtime}};
    } else if (starttime == '' && endtime != '') {
        query = {operationTime: {$lte: endtime}};
    } else if (starttime != '' && endtime == '') {
        query = {operationTime: {$gte: starttime}};
    }

    operationLogService.findLogs(query, order).then((results) => {
        for (var i = 0; i < results.length; i++) {
            results[i].operationTime = getNormalTime(results[i].operationTime);
        }
        res.locals.operationLogs = results;
        res.render('operationLog');
    });
});

module.exports = router;