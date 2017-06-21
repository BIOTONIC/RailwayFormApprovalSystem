var express = require('express');
var router = express.Router();

var conf = require('../others/config');
var isLogin = require('../others/auth').isLogin;
var getFormatTime = require('../others/util').getFormatTime;
var getState = require('../others/util').getState;
var app1Service = require('../services/app1Service');
var app2Service = require('../services/app2Service');
var app3Service = require('../services/app3Service');
var userServiceForSqlServer = require('../services/userServiceForSqlServer');

var workshopList = [];


router.get('/', isLogin, function (req, res, next) {
    if (typeof req.session.formId != 'undefined') {
        delete req.session.formId;
    }
    req.flash('success', req.session.notif);
    res.render('home');
});

router.get('/logout', isLogin, function (req, res, next) {
    res.cookie('id', 0, {maxAge: 0});
    res.cookie('person', 0, {maxAge: 0});
    res.cookie('workshop', 0, {maxAge: 0});
    res.redirect('/login');
});

router.get('/apply', isLogin, function (req, res, next) {
    req.flash('success', req.session.notif);
    var person = req.session.person;
    if (person != '1') {
        req.flash('error', '无权申请表格');
        return res.redirect('back');
    }
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
    req.flash('success', req.session.notif);

    var person = req.session.person;
    var need = ['id', 'workshop', 'nextperson'];
    var order = [['id', 'DESC']];
    var query = {};
    var appResults = [];

    if (person == '1' || person == '2') {
        // list forms only from this workshop
        var workshop = req.session.workshop;
        query = {workshop: workshop};
    } else if (person == '3' || person == '4' || person == '5') {
        // list all forms
        query = {};
    } else {
        // person wrong
        req.flash('error', '账号角色错误');
        return res.redirect('/home');
    }

    var func1 = app1Service.find2(need, query, order).then((app1Results) => {
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

    var func2 = app2Service.find2(need, query, order).then((app2Results) => {
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

    var func3 = app3Service.find2(need, query, order).then((app3Results) => {
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

    Promise.all([func1, func2, func3]).then((result) => {
        for (var i = 0; i < appResults.length; i++) {
            appResults[i].state = getState(person, appResults[i].nextperson);
        }

        res.locals.appResults = appResults;

        res.render('list');
    });
});

router.get('/query', isLogin, function (req, res, next) {
    req.flash('success', req.session.notif);

    res.locals.person = req.session.person;
    // this is current user's workshop
    res.locals.currWorkshop = req.session.workshop;

    if (conf.userTableFromSqlServer) {
        userServiceForSqlServer.findWorkshop().then((results) => {
            if (typeof results === 'undefined' || results.length == 0) {
                req.flash('error', '车间信息错误');
                return res.redirect('/home');
            } else {
                workshopList = [];
                for (var i = 0; i < results.length; i++) {
                    workshopList.push(results[i].Name.trim());
                }

                // this is the workshop selected in ComboBox
                // maybe it is better to call it selectedWorkshop
                res.locals.workshop = '';
                res.locals.workshopList = workshopList;
                res.locals.appResults = [];
                res.render('query');
            }
        });
    }
    else {
        res.locals.workshop = '';
        res.locals.workshopList = workshopList;
        res.locals.appResults = [];
        res.render('query');
    }
});

router.get('/queryResult', isLogin, function (req, res, next) {
        req.flash('success', req.session.notif);

        res.locals.person = req.session.person;
        res.locals.currWorkshop = req.session.workshop;

        var person = req.session.person;
        var workshop = req.query.workshop;
        var sqstarttime = req.query.sqstarttime;
        var sqendtime = req.query.sqendtime;
        var section = req.query.section;

        var need = ['id', 'workshop', 'nextperson'];
        var order = [['id', 'DESC']];
        var query = {};
        var appResults = [];

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
        }
        if (typeof workshop != '') {
            query.workshop = workshop;
        }
        if (section != '') {
            query.section = {$like: '%' + section + '%'};
        }

        var func1 = app1Service.find2(need, query, order).then((app1Results) => {
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

        var func2 = app2Service.find2(need, query, order).then((app2Results) => {
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

        var func3 = app3Service.find2(need, query, order).then((app3Results) => {
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

        Promise.all([func1, func2, func3]).then((result) => {
                for (var i = 0; i < appResults.length; i++) {
                    appResults[i].state = getState(person, appResults[i].nextperson);
                }

                res.locals.workshop = workshop;
                res.locals.workshopList = workshopList;
                res.locals.appResults = appResults;

                res.render('query');
            }
        );
    }
)
;

module.exports = router;
