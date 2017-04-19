var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getFormatTime = require('../others/util').getFormatTime;
var getState = require('../others/util').getState;
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
    // app1 to home/app1
    // /app1 to app1
    if (type == 'first') {
        res.redirect('/app1/create');
    } else if (type == 'second') {
        res.redirect('/app2/create');
    } else if (type == 'third') {
        res.redirect('/app3/create');
    } else {
        res.render('error');
    }
});

router.get('/list', isLogin, function (req, res, next) {
    var person = req.session.userId.slice(0, 1);
    var need = ['id', 'workshop', 'nextperson'];
    var query = {};
    var appResults = [];

    if (person == '1' || person == '2') {
        // list forms only from this workshop
        var workshop = req.session.userId.slice(1);
        query = {workshop: workshop};
    } else if (person == '3' || person == '4' || person == '5') {
        // list all forms
        query = {};
    } else {
        // person wrong
        req.flash('error', '账号角色错误');
        return res.redirect('/home');
    }


    app1Service.find(need, query).then((app1Results) => {
        if (app1Results != null && app1Results.length > 0) {
            for (var i = 0; i < app1Results.length; i++) {
                var result = {};
                result.id = app1Results[i].id;
                result.href = '/app1?formId=' + result.id;
                result.name = '一级审批表' + result.id;
                result.workshop = app1Results[i].workshop;
                result.nextperson = app1Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app2Service.find(need, query).then((app2Results) => {
        if (app2Results != null && app2Results.length > 0) {
            for (var i = 0; i < app2Results.length; i++) {
                var result = {};
                result.id = app2Results[i].id;
                result.href = '/app2?formId=' + result.id;
                result.name = '二级审批表' + result.id;
                result.workshop = app2Results[i].workshop;
                result.nextperson = app2Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app3Service.find(need, query).then((app3Results) => {
        if (app3Results != null && app3Results.length > 0) {
            for (var i = 0; i < app3Results.length; i++) {
                var result = {};
                result.id = app3Results[i].id;
                result.href = '/app3?formId=' + result.id;
                result.name = '三级审批表' + result.id;
                result.workshop = app3Results[i].workshop;
                result.nextperson = app3Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    setTimeout(function () {
        for (var i = 0; i < appResults.length; i++) {
            appResults[i].state = getState(person, appResults[i].nextperson);
        }

        res.locals.appResults = appResults;

        res.render('list');
    }, 1000);
});

router.get('/query', isLogin, function (req, res, next) {
    res.render('query');
});

router.get('/queryResult', isLogin, function (req, res, next) {
    var person = req.session.userId.slice(0, 1);
    var workshop = req.query.workshop;
    var sqstarttime = req.query.sqstarttime;
    var sqendtime = req.query.sqendtime;
    var section = req.query.section;

    var need = ['id', 'workshop', 'nextperson'];
    var query = {};
    var appResults = [];

    if (typeof workshop != 'undefined') {
        query = {workshop: workshop};
    } else if (typeof sqstarttime != 'undefined' && typeof sqendtime != 'undefined') {
        if (sqstarttime != '' && sqendtime != '') {
            sqstarttime = getFormatTime(sqstarttime);
            sqendtime = getFormatTime(sqendtime);
            query = {sqstarttime: {$gte: sqstarttime}, sqendtime: {$lte: sqendtime}};
        } else if (sqstarttime != '' && sqendtime == '') {
            sqstarttime = getFormatTime(sqstarttime);
            query = {sqstarttime: {$gte: sqstarttime}};
        } else if (sqstarttime == '' && sqendtime != '') {
            sqendtime = getFormatTime(sqendtime);
            query = {sqendtime: {$lte: sqendtime}};
        } else {
            res.redirect('back');
        }
    } else if (typeof section != 'undefined') {
        if (section == '') {
            res.redirect('back');
        } else {
            query = {section: section};
        }
    } else {
        res.redirect('back');
    }

    app1Service.find(need, query).then((app1Results) => {
        if (app1Results != null && app1Results.length > 0) {
            for (var i = 0; i < app1Results.length; i++) {
                var result = {};
                result.id = app1Results[i].id;
                result.href = '/app1?formId=' + result.id;
                result.name = '一级审批表' + result.id;
                result.workshop = app1Results[i].workshop;
                result.nextperson = app1Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app2Service.find(need, query).then((app2Results) => {
        if (app2Results != null && app2Results.length > 0) {
            for (var i = 0; i < app2Results.length; i++) {
                var result = {};
                result.id = app2Results[i].id;
                result.href = '/app2?formId=' + result.id;
                result.name = '二级审批表' + result.id;
                result.workshop = app2Results[i].workshop;
                result.nextperson = app2Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    app3Service.find(need, query).then((app3Results) => {
        if (app3Results != null && app3Results.length > 0) {
            for (var i = 0; i < app3Results.length; i++) {
                var result = {};
                result.id = app3Results[i].id;
                result.href = '/app3?formId=' + result.id;
                result.name = '三级审批表' + result.id;
                result.workshop = app3Results[i].workshop;
                result.nextperson = app3Results[i].nextperson;
                appResults.push(result);
            }
        }
    });

    setTimeout(function () {
        for (var i = 0; i < appResults.length; i++) {
            appResults[i].state = getState(person, appResults[i].nextperson);
        }

        res.locals.appResults = appResults;

        res.render('list');
    }, 1000);
});

module.exports = router;
