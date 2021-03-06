var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getFormatTime = require('../others/util').getFormatTime;
var getNormalTime = require('../others/util').getNormalTime;
var app1Service = require('../services/app1Service');
var confService = require('../services/confService');
var operationLogService = require('../services/operationLogService');

/*
person:
1   Normal Worker
2   Workshop Manager
3   Tech Department
4   Secure Department
5   Manager

nextperson:
10  Wait for normal worker to apply
20  Wait for workshop manager to check, while normal worker can update here
29  Workshop manager rejects this application, terminated
30  Workshop manager agrees with application, wait for tech department to check
39  Tech department rejects this application, terminated
40  Tech department agrees with this application, wait for secure department to check
49  Secure department rejects this application, terminated
50  Secure department agrees with this application, wait for manager to check
59  Manager rejects this application, terminated
60  Manager agrees with this application, wait for normal worker to finish
70  Normal worker finishes this application
 */

var addOperationLog = function (userId, name, person, loginIp, operationDesc) {
    var log = {};
    log.userId = userId;
    log.name = name;
    log.person = person;
    log.loginIp = loginIp;
    log.operationTime = getTime();
    log.operationDesc = operationDesc;
    operationLogService.createLog(log);
};

router.get('/create', isLogin, function (req, res, next) {
    res.locals.popup = false;

    var workshop = req.session.workshop;
    // create a new application
    res.locals.workshop = workshop;
    res.locals.telephone = '';
    res.locals.fax = '';
    res.locals.applyid = '系统自行分配';
    res.locals.approveid = '系统自行分配';
    res.locals.section = '';
    res.locals.reason = '';
    res.locals.sqstarttime = '';
    res.locals.sqendtime = '';
    res.locals.noticedepart = '';
    res.locals.shigongfang = '';
    res.locals.plan = '';
    res.locals.techplan = '';
    res.locals.secureplan = '';
    res.locals.workshopmgr = '';
    res.locals.workshopmgrtime = '系统自行分配';
    res.locals.techdepart = '';
    res.locals.techtime = '系统自行分配';
    res.locals.pfstarttime = '';
    res.locals.pfendtime = '';
    res.locals.securedepart = '';
    res.locals.securetime = '系统自行分配';
    res.locals.manager = '';
    res.locals.managertime = '系统自行分配';
    res.locals.result = '';
    res.locals.applytime = '系统自行分配';
    res.locals.submitbtn = '提交';
    res.locals.nextperson = '10';
    req.session.nextperson = '10';
    res.render('firstlevel');
});

router.get('/', isLogin, function (req, res, next) {
    res.locals.popup = false;

    var person = req.session.person;
    var query = {};
    if (typeof req.query.formId != 'undefined') {
        query.id = req.query.formId;
        req.session.formId = req.query.formId;
    }
    else {
        query.id = req.session.formId;
    }
    app1Service.find3(query).then((results) => {
        if (typeof results === 'undefined') {
            req.flash('error', '申请表不存在');
            return res.redirect('home');
        } else {
            // return all data seems easy
            res.locals.workshop = results[0].workshop;
            res.locals.telephone = results[0].telephone;
            res.locals.fax = results[0].fax;
            res.locals.applyid = results[0].applyid;
            res.locals.approveid = results[0].approveid;
            res.locals.section = results[0].section;
            res.locals.reason = results[0].reason;
            res.locals.sqstarttime = getNormalTime(results[0].sqstarttime);
            res.locals.sqendtime = getNormalTime(results[0].sqendtime);
            res.locals.noticedepart = results[0].noticedepart;
            res.locals.shigongfang = results[0].shigongfang;
            res.locals.plan = results[0].plan;
            res.locals.techplan = results[0].techplan;
            res.locals.secureplan = results[0].secureplan;
            res.locals.applytime = getNormalTime(results[0].applytime);
            res.locals.workshopmgr = results[0].workshopmgr;
            res.locals.workshopmgrtime = getNormalTime(results[0].workshopmgrtime);
            res.locals.techdepart = results[0].techdepart;
            res.locals.techtime = getNormalTime(results[0].techtime);
            res.locals.pfstarttime = getNormalTime(results[0].pfstarttime);
            res.locals.pfendtime = getNormalTime(results[0].pfendtime);
            res.locals.securedepart = results[0].securedepart;
            res.locals.securetime = getNormalTime(results[0].securetime);
            res.locals.manager = results[0].manager;
            res.locals.managertime = getNormalTime(results[0].managertime);
            res.locals.result = results[0].result;
            res.locals.submitbtn = (person == '1' ? '提交' : '同意');
            res.locals.nextperson = results[0].nextperson;
            req.session.nextperson = results[0].nextperson;
            res.render('firstlevel');
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    res.locals.popup = false;

    var person = req.session.person;
    var nextperson = req.session.nextperson;

    var loginIp = req.headers['x-real-ip'] || req.connection.remoteAddress;

    var app1 = {};

    if (person == '1') {
        // normal worker
        var workshop = req.session.workshop;
        var actualworkshop = req.body.workshop;
        if (nextperson == '10') {
            // create a new application
            confService.getApplyCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApplyCount未存储');
                    return res.redirect('/app1');
                } else {
                    var date = getDate();
                    var count = counts[0].applycount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var applyid = date + fixCount;

                    //id is the same with applyid
                    app1.id = applyid;
                    app1.workshop = req.session.workshop;
                    app1.telephone = req.body.telephone;
                    app1.fax = req.body.fax;
                    app1.applyid = applyid;
                    app1.section = req.body.section;
                    app1.reason = req.body.reason;
                    app1.sqstarttime = getFormatTime(req.body.sqstarttime);
                    app1.sqendtime = getFormatTime(req.body.sqendtime);
                    app1.noticedepart = req.body.noticedepart;
                    // NOTICE!!!
                    //
                    // 先贴上原本的错误范例
                    // app1.constructor = req.body.constructor;
                    //
                    // 血泪教训告诉你
                    // 施工方英文不能叫constructor啊
                    // constructor是人家的构造函数啊
                    // 老老实实 shigongfang 多么接地气 多么优雅
                    app1.shigongfang = req.body.shigongfang;
                    app1.plan = req.body.plan;
                    app1.techplan = req.body.techplan;
                    app1.secureplan = req.body.secureplan;
                    app1.applytime = getTime();
                    app1.nextperson = '20';

                    app1Service.createApp1(app1).then((result) => {
                        req.flash('success', '提交成功');
                        addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：新建表格');
                        return res.redirect('home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('home');
                    });
                }
            });
        } else if (workshop != actualworkshop) {
            // only the exact workshop manager can check the application
            req.flash('error', '无权查看其他车间');
            return res.redirect('home');
        }
        else if (nextperson == '20') {
            // update the application before workshop manager check


            app1.telephone = req.body.telephone;
            app1.fax = req.body.fax;
            app1.section = req.body.section;
            app1.reason = req.body.reason;
            app1.sqstarttime = getFormatTime(req.body.sqstarttime);
            app1.sqendtime = getFormatTime(req.body.sqendtime);
            app1.noticedepart = req.body.noticedepart;
            app1.shigongfang = req.body.shigongfang;
            app1.plan = req.body.plan;
            app1.techplan = req.body.techplan;
            app1.secureplan = req.body.secureplan;
            // nextperson will not change
            app1.nextperson = '20';

            //play a small trick here because applyid equals to form id
            app1.formId = req.body.applyid;

            app1Service.updateApp1(app1).then((result) => {
                req.flash('success', '更新成功');
                addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：更新表格');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('home');
            });
        } else if (nextperson == '29') {
            req.flash('error', '车间主任不同意');
            return res.redirect('home');
        } else if (nextperson == '30') {
            req.flash('error', '技术科审核中 不能更新');
            return res.redirect('home');
        }
        else if (nextperson == '39') {
            req.flash('error', ' 技术科不同意');
            return res.redirect('home');
        } else if (nextperson == '40') {
            req.flash('error', '安全科审核中 不能更新');
            return res.redirect('home');
        } else if (nextperson == '49') {
            req.flash('error', ' 安全科不同意');
            return res.redirect('home');
        } else if (nextperson == '50') {
            req.flash('error', '段领导审核中 不能更新');
            return res.redirect('home');
        } else if (nextperson == '59') {
            req.flash('error', '段领导不同意');
            return res.redirect('home');
        } else if (nextperson == '60') {
            // finish the result
            app1.result = req.body.result;
            // nextperson change to 7, means finish
            app1.nextperson = '70';
            app1.formId = req.body.applyid;

            app1Service.updateResult(app1).then((result) => {
                req.flash('success', '销点完成');
                addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：销点');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('home');
            });
        } else if (nextperson == '70') {
            // the application is closed
            req.flash('error', '填写完毕 不能更新');
            return res.redirect('home');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('home');
        }
    }
    else if (person == '2') {
        //workshop manager
        var workshop = req.session.workshop;
        var actualworkshop = req.body.workshop;
        if (workshop != actualworkshop) {
            // only the exact workshop manager can check the application
            req.flash('error', '无权审批其他车间');
            return res.redirect('home');
        }
        else if (nextperson == '20') {
            // update the application before tech depart check
            app1.workshopmgr = req.body.workshopmgr;
            app1.workshopmgrtime = getTime();
            if (req.body.approve == 'true') {
                app1.nextperson = '30';
            }
            else {
                app1.nextperson = '29';
            }
            app1.formId = req.body.applyid;

            app1Service.updateWorkshopMgr(app1).then((result) => {
                req.flash('success', '审批完成');
                addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：车间审批');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('home');
            });
        } else if (nextperson == '29') {
            // can not update
            req.flash('error', '您已不同意该表格');
            return res.redirect('home');
        } else if (nextperson == '30' || nextperson == '39' || nextperson == '40' || nextperson == '49'
            || nextperson == '50' || nextperson == '59' || nextperson == '60'
            || nextperson == '70') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('home');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('home');
        }
    } else if (person == '3') {
        // tech depart
        if (nextperson == '30') {
            // update the application before secure depart check
            app1.techdepart = req.body.techdepart;
            app1.techtime = getTime();
            app1.pfstarttime = getFormatTime(req.body.pfstarttime);
            app1.pfendtime = getFormatTime(req.body.pfendtime);
            if (req.body.approve == 'true') {
                app1.nextperson = '40';
            } else {
                app1.nextperson = '39';
            }
            app1.formId = req.body.applyid;

            app1Service.updateTech(app1).then((result) => {
                req.flash('success', '审批完成');
                addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：技术科审批');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('home');
            });
        } else if (nextperson == '39') {
            // can not update
            req.flash('error', '您已不同意该表格');
            return res.redirect('home');
        } else if (nextperson == '40' || nextperson == '49' || nextperson == '50' || nextperson == '60'
            || nextperson == '70') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('home');
        }
        else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('home');
        }
    } else if (person == '4') {
        // secure depart
        if (nextperson == '40') {
            // update the application before manager check
            app1.securedepart = req.body.securedepart;
            app1.securetime = getTime();
            if (req.body.approve == 'true') {
                app1.nextperson = '50';
            }
            else {
                app1.nextperson = '49';
            }
            app1.formId = req.body.applyid;

            app1Service.updateSecure(app1).then((result) => {
                addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：安全科审批');
                req.flash('success', '审批完成');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('home');
            });
        } else if (nextperson == '49') {
            // can not update
            req.flash('error', '您已不同意该表格');
            return res.redirect('home');
        } else if (nextperson == '50' || nextperson == '59' || nextperson == '60' || nextperson == '70') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('home');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('home');
        }
    } else if (person == '5') {
        // manager
        if (nextperson == '50') {
            // update the application before result
            confService.getApproveCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApproveCount未存储');
                    return res.redirect('home');
                } else {
                    var date = getDate();
                    var count = counts[0].approvecount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var approveid = date + fixCount;

                    app1.approveid = approveid;
                    app1.manager = req.body.manager;
                    app1.managertime = getTime();
                    if (req.body.approve == 'true') {
                        app1.nextperson = '60';
                    }
                    else {
                        app1.nextperson = '59';
                    }
                    app1.formId = req.body.applyid;

                    app1Service.updateManager(app1).then((result) => {
                        addOperationLog(req.session.userId, req.session.userName, req.session.person, loginIp, '一级审批表：段领导审批');
                        req.flash('success', '审批完成');
                        return res.redirect('home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('home');
                    });
                }
            });
        } else if (nextperson == '59') {
            // can not update
            req.flash('error', '您已不同意该表格');
            return res.redirect('home');
        } else if (nextperson == '60' || nextperson == '70') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('home');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('home');
        }
    } else {
        // person wrong
        req.flash('error', '账号角色错误');
        return res.redirect('home');
    }
});

module.exports = router;