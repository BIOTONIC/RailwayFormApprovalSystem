var express = require('express');
var router = express.Router();

var conf = require('../others/config');
var notLogin = require('../others/auth').notLogin;
var userService = require('../services/userService');
var userServiceForSqlServer = require('../services/userServiceForSqlServer');

router.get('/', notLogin, function (req, res, next) {
    res.render('login');
});

router.post('/', notLogin, function (req, res, next) {
        var name = req.body.username;
        var password = req.body.password;

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
                            req.session.userId = result1[0].ID;
                            req.session.person = '5';
                            req.session.workshop = '0';
                            res.cookie('id', req.session.userId);
                            res.cookie('person',req.session.person);
                            res.cookie('workshop',req.session.workshop);
                            req.flash('success', '登录成功 ' + result2[0].Name + ' ' + req.session.person);
                            return res.redirect('home');
                        }
                        // department will get person at second query
                        else if (result2[0].ParentID == conf.mssql.parentId.department) {
                            delete password;
                            req.session.userId = result2[0].ID;
                            // TODO 判断是安全科还是技术科 还是其他科
                            if (result2[0].ID == '2') {
                                req.session.person = '4';
                            }
                            else {
                                req.session.person = '3';
                            }
                            req.session.workshop = '0';
                            res.cookie('id', req.session.userId);
                            res.cookie('person',req.session.person);
                            res.cookie('workshop',req.session.workshop);
                            req.flash('success', '登录成功 ' + result2[0].Name + ' ' + req.session.person);
                            return res.redirect('home');
                        }
                        // workshopmgr will get person at second query
                        else if (result2[0].ParentID == conf.mssql.parentId.department) {
                            req.flash('success', '登录成功 ' + result2[0].Name + ' ' + req.session.person);
                            delete password;
                            req.session.userId = result2[0].ID;
                            req.session.person = '2';
                            req.session.workshop = result2[0].Name;
                            res.cookie('id', req.session.userId);
                            res.cookie('person',req.session.person);
                            res.cookie('workshop',req.session.workshop);
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
                                    req.session.userId = result3[0].ID;
                                    req.session.person = '1';
                                    req.session.workshop = result3[0].Name;
                                    res.cookie('id', req.session.userId);
                                    res.cookie('person',req.session.person);
                                    res.cookie('workshop',req.session.workshop);
                                    req.flash('success', '登录成功 ' + result3[0].Name + ' ' + req.session.person);
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
                    res.cookie('person',req.session.person);
                    res.cookie('workshop',req.session.workshop);
                    req.flash('success', '登录成功');
                    return res.redirect('home');
                }
            });
        }
    }
)
;

module.exports = router;