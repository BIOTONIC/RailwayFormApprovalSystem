var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getFormatTime = require('../others/util').getFormatTime;
var getNormalTime = require('../others/util').getNormalTime;
var loginLogService = require('../services/loginLogService');

router.get('/', isLogin, function (req, res, next) {
    res.locals.loginLogs = [];
    res.render('loginLog');
});

router.get('/query', isLogin, function (req, res, next) {
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

module.exports = router;