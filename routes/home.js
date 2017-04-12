var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var app1Service = require('../services/app1Service');
var app2Service = require('../services/app2Service');
var app3Service = require('../services/app3Service');

router.get('/', isLogin, function (req, res, next) {
    if (typeof req.session.formId != 'undefined') {
        delete req.session.formId;
    }
    res.render('home');
});

router.get('/apply', isLogin, function (req, res, next) {
    var type = req.query.type;
    // NOTICE
    // redirect
    // app1 就跳转到home/app1
    // /app1 就跳转到app1
    if (type == 'first') {
        res.redirect('/app1');
    } else if (type == 'second') {
        res.redirect('/app2');
    } else if (type == 'third') {
        res.redirect('/app3');
    } else {
        res.render('error');
    }
});

router.get('/query', isLogin, function (req, res, next) {
    var level = req.query.level;
    req.session.formId = req.query.id;
    if (level == '1') {
        res.redirect('/app1');
    } else if (level == '2') {
        res.redirect('/app2');
    } else if (level == '3') {
        res.redirect('/app3');
    } else {
        req.flash('error', '请求参数错误');
        res.redirect('/home');
    }
});

router.get('/queryall', isLogin, function (req, res, next) {
    var need = ['id', 'workshop', 'nextperson'];
    var order = [['applytime', 'ASC']];
    var appResults = [];

    app1Service.find2(need, order).then((app1Results) => {
        if (app1Results != null && app1Results.length > 0) {
            for (var i = 0; i < app1Results.length; i++) {
                var result = {};
                result.level = '1';
                result.id = app1Results[i].id;
                result.workshop = app1Results[i].workshop;
                result.nextperson = app1Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app2Service.find2(need, order).then((app2Results) => {
        if (app2Results != null && app2Results.length > 0) {
            for (var i = 0; i < app2Results.length; i++) {
                var result = {};
                result.level = '2';
                result.id = app2Results[i].id;
                result.workshop = app2Results[i].workshop;
                result.nextperson = app2Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app3Service.find2(need, order).then((app3Results) => {
        if (app3Results != null && app3Results.length > 0) {
            for (var i = 0; i < app3Results.length; i++) {
                var result = {};
                result.level = '3';
                result.id = app3Results[i].id;
                result.workshop = app3Results[i].workshop;
                result.nextperson = app3Results[i].nextperson;
                appResults.push(result);
            }
        }

        // TODO
        // It's not good to push res.json() here if aap1Service and app2Service too long time than app3Service
        // But I am a freshman to Javascript, so sorry.
        res.json(appResults)
    });

});

module.exports = router;
