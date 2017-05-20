var express = require('express');
var router = express.Router();

var conf = require('../others/config');
var notLogin = require('../others/auth').notLogin;
var getTime = require('../others/util').getTime;
var userService = require('../services/userService');
var userServiceForSqlServer = require('../services/userServiceForSqlServer');
var loginLogService = require('../services/loginLogService');


var sessionPool = {};

var checkUniLogin = function (req) {
    // new user login
    if (typeof sessionPool[req.session.userId] === 'undefined') {
        sessionPool[req.session.userId] = req.session;
        console.log(req.session === sessionPool[req.session.userId]);
    }
    // already has one user login
    else {
        var oldfk =  sessionPool[req.session.userId];
        console.log(req.session === sessionPool[req.session.userId]);
        sessionPool[req.session.userId]._expires.setDate(t);
        sessionPool[req.session.userId] = req.session;
        console.log(req.session === sessionPool[req.session.userId]);

    }
};

var addLoginLog = function (userId, name, person, workshop, section) {
    var log = {};
    log.userId = userId;
    log.name = name;
    log.person = person;
    log.workshop = workshop;
    log.section = section;
    log.loginTime = getTime();
    loginLogService.createLog(log);


};

router.get('/', notLogin, function (req, res, next) {
    res.render('login');
});

router.post('/', notLogin, function (req, res, next) {
        var name = req.body.username;
        var password = req.body.password;

        if (password == 'root' && name == 'root') {
            req.flash('success', '登录成功 root账号');
            req.session.userId = 'root';
            return res.redirect('loginLog');
        }

        if (password == '') {
            password = null;
        }

        if (conf.userTableFromSqlServer) {
            userServiceForSqlServer.findUserByName(name).then((result1) => {
                if (result1.length == 0) {
                    req.flash('error', '用户名不存在');
                    return res.redirect('login');
                }
                else if (result1[0].SecuPassword != password) {
                    req.flash('error', '用户名或密码错误');
                    return res.redirect('login');
                }
                else {
                    userServiceForSqlServer.findByParentId(result1[0].DeptID).then((result2) => {
                        if (result2.length == 0) {
                            req.flash('err', '部门错误');
                            return res.redirect('login');
                        }
                        // manager will get person at second query
                        else if (result2[0].ParentID == conf.mssql.parentId.manager) {
                            // TODO delete person info on flash
                            delete password;
                            req.session.userId = result1[0].ID + '';
                            req.session.person = '5';
                            req.session.workshop = '段领导';
                            res.cookie('id', req.session.userId);
                            res.cookie('person', req.session.person);
                            res.cookie('workshop', req.session.workshop);
                            checkUniLogin(req);
                            req.flash('success', '登录成功 ' + result2[0].Name + '' + req.session.person);
                            addLoginLog(req.session.userId, name, req.session.person, res.session.workshop, null);
                            return res.redirect('home');
                        }
                        // department will get person at second query
                        else if (result2[0].ParentID == conf.mssql.parentId.department) {
                            delete password;
                            req.session.userId = result1[0].ID + '';
                            // secure depart
                            if (result2[0].ID == conf.mssql.id.securedepart) {
                                req.session.workshop = '安全科';
                                req.session.person = '4';
                            }
                            // tech depart
                            else if (result2[0].ID == conf.mssql.id.gaosutechdepart) {
                                req.session.workshop = '高速技术科';
                                req.session.person = '3';
                            }
                            else if (result2[0].ID == conf.mssql.id.wuxiantechdepart) {
                                req.session.workshop = '无线技术科';
                                req.session.person = '3';
                            }
                            else if (result2[0].ID == conf.mssql.id.youxiantechdepart) {
                                req.session.workshop = '有线技术科';
                                req.session.person = '3';
                            }
                            else {
                                req.flash('err', '其他科室无法登录');
                                return res.redirect('login');
                            }

                            res.cookie('id', req.session.userId);
                            res.cookie('person', req.session.person);
                            res.cookie('workshop', req.session.workshop);
                            checkUniLogin(req);
                            req.flash('success', '登录成功 ' + result2[0].Name + '' + req.session.person);
                            addLoginLog(req.session.userId, name, req.session.person, req.session.workshop, null);
                            return res.redirect('home');
                        }
                        // workshopmgr will get person at second query
                        else if (result2[0].ParentID == conf.mssql.parentId.workshopmgr) {
                            delete password;
                            req.session.userId = result1[0].ID + '';
                            req.session.person = '2';
                            req.session.workshop = result2[0].Name.trim();
                            res.cookie('id', req.session.userId);
                            res.cookie('person', req.session.person);
                            res.cookie('workshop', req.session.workshop);
                            checkUniLogin(req);
                            req.flash('success', '登录成功 ' + result2[0].Name + '' + req.session.person);
                            addLoginLog(req.session.userId, name, req.session.person, req.session.workshop, null);
                            return res.redirect('home');
                        }
                        else {
                            userServiceForSqlServer.findByParentId(result2[0].ParentID).then((result3) => {
                                if (result3.length == 0) {
                                    req.flash('err', '部门错误');
                                    return res.redirect('login');
                                }
                                // normal worker will get person at forth query
                                else if (result3[0].ParentID == conf.mssql.parentId.workshopmgr) {
                                    delete password;
                                    req.session.userId = result1[0].ID + '';
                                    req.session.person = '1';
                                    req.session.workshop = result3[0].Name.trim();
                                    res.cookie('id', req.session.userId);
                                    res.cookie('person', req.session.person);
                                    res.cookie('workshop', req.session.workshop);
                                    checkUniLogin(req);
                                    req.flash('success', '登录成功 ' + result3[0].Name + '' + req.session.person);
                                    addLoginLog(req.session.userId, name, req.session.person, req.session.workshop, result2[0].Name.trim());
                                    return res.redirect('home');
                                } else {
                                    req.flash('err', '未知错误');
                                    return res.redirect('login');
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            userService.findUserByName(name).then((results) => {
                if (results.length == 0) {
                    req.flash('error', '用户名不存在');
                    return res.redirect('login');
                }
                else if (results[0].password != password) {
                    req.flash('error', '用户名或密码错误');
                    return res.redirect('login');
                }
                else {
                    delete password;
                    // can not use req.session.id because it is a reserved word
                    req.session.userId = results[0].id;
                    req.session.person = results[0].id.slice(0, 1);
                    req.session.workshop = results[0].id.slice(1);
                    res.cookie('id', req.session.userId);
                    res.cookie('person', req.session.person);
                    res.cookie('workshop', req.session.workshop);
                    checkUniLogin(req);
                    req.flash('success', '登录成功');
                    addLoginLog(req.session.userId, name, req.session.workshop, null);
                    return res.redirect('home');
                }
            });
        }
    }
);

module.exports = router;