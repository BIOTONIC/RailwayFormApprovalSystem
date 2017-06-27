var express = require('express');
var router = express.Router();

var conf = require('../others/config');
var userServiceForSqlServer = require('../services/userServiceForSqlServer');

router.get('/', function (req, res, next) {
    return res.json({'state': 'error', 'desc': '请使用POST连接'});
});

router.post('/', function (req, res, next) {
    var name = req.body.username;
    var password = req.body.password;

    if (conf.userTableFromSqlServer) {
        userServiceForSqlServer.findUserByName(name).then((result1) => {
            if (result1.length == 0) {
                return res.json({'state': 'error', 'desc': '用户名不存在'});
            }
            else if (result1[0].SecuPassword != null && result1[0].SecuPassword != password) {
                return res.json({'state': 'error', 'desc': '用户名或密码错误'});
            }
            else if (result1[0].SecuPassword == null && password != '') {
                return res.json({'state': 'error', 'desc': '用户名或密码错误'});
            }
            else {
                userServiceForSqlServer.findByParentId(result1[0].DeptID).then((result2) => {
                    if (result2.length == 0) {
                        return res.json({'state': 'error', 'desc': '部门错误'});
                    }
                    // manager will get person at second query
                    else if (result2[0].ParentID == conf.mssql.parentId.manager) {
                        delete password;
                        var userId = result1[0].ID + '';
                        return res.json({'state': 'success', 'desc': userId + '&5&' + name + '&段领导&北京通信段'});
                    }
                    // department will get person at second query
                    else if (result2[0].ParentID == conf.mssql.parentId.department) {
                        delete password;
                        var userId = result1[0].ID + '';
                        // secure depart
                        if (result2[0].ID == conf.mssql.id.securedepart) {
                            return res.json({
                                'state': 'success',
                                'desc': userId + '&4&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                            });
                        }
                        // tech depart
                        else if (result2[0].ID == conf.mssql.id.gongchengshidepart) {
                            return res.json({
                                'state': 'success',
                                'desc': userId + '&3&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                            });
                        }
                        else if (result2[0].ID == conf.mssql.id.gaosutechdepart) {
                            return res.json({
                                'state': 'success',
                                'desc': userId + '&3&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                            });
                        }
                        else if (result2[0].ID == conf.mssql.id.wuxiantechdepart) {
                            return res.json({
                                'state': 'success',
                                'desc': userId + '&3&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                            });
                        }
                        else if (result2[0].ID == conf.mssql.id.youxiantechdepart) {
                            return res.json({
                                'state': 'success',
                                'desc': userId + '&3&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                            });
                        }
                        else {
                            return res.json({'state': 'error', 'desc': '其他科室无法登录'});
                        }
                    }
                    // workshopmgr will get person at second query
                    else if (result2[0].ParentID == conf.mssql.parentId.workshopmgr) {
                        delete password;
                        var userId = result1[0].ID + '';
                        return res.json({
                            'state': 'success',
                            'desc': userId + '&2&' + name + '&' + result2[0].Name.trim() + '&北京通讯段'
                        });
                    }
                    else {
                        userServiceForSqlServer.findByParentId(result2[0].ParentID).then((result3) => {
                            if (result3.length == 0) {
                                return res.json({'state': 'error', 'desc': '部门错误'});
                            }
                            // normal worker will get person at forth query
                            else if (result3[0].ParentID == conf.mssql.parentId.workshopmgr) {
                                delete password;
                                var userId = result1[0].ID + '';
                                return res.json({
                                    'state': 'error',
                                    'desc': userId + '&1&' + name + '&' + result2[0].Name.trim() + '&' + result3[0].Name.trim()
                                });
                            } else {
                                return res.json({'state': 'error', 'desc': '未知错误'});
                            }
                        });
                    }
                });
            }
        });
    } else {
        return res.json({'state': 'error', 'desc': '未连接到SQLServer数据库'});
    }

});

module.exports = router;