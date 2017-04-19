var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getState = require('../others/util').getState;
var app1Service = require('../services/app1Service');
var app2Service = require('../services/app2Service');
var app3Service = require('../services/app3Service');

router.get('/', isLogin, function (req, res, next) {
    if (typeof req.session.formId != 'Undefined') {
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
    var appResults = [];

    if (person == '1' || person == '2') {
        // list forms only from this workshop
        var workshop = req.session.userId.slice(1);
        var query = {workshop: workshop};
    } else if (person == '3' || person == '4' || person == '5') {
        // list all forms
        var query = {};
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

// router.get('/query', isLogin, function (req, res, next) {
//     var level = req.query.level;
//     req.session.formId = req.query.id;
//     if (level == '1') {
//         res.redirect('/app1');
//     } else if (level == '2') {
//         res.redirect('/app2');
//     } else if (level == '3') {
//         res.redirect('/app3');
//     } else {
//         req.flash('error', '请求参数错误');
//         res.redirect('/home');
//     }
// });

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
