var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getFormatTime = require('../others/util').getFormatTime;
var getNormalTime = require('../others/util').getNormalTime;
var app3Service = require('../services/app3Service');
var confService = require('../services/confService');

router.get('/create', isLogin, function (req, res, next) {
    res.locals.popup = true;

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
    res.locals.result = '';
    res.locals.applytime = '系统自行分配';
    res.locals.submitbtn = '提交';
    res.locals.nextperson = '10';
    req.session.nextperson = '10';
    res.render('thirdlevel');
});

router.get('/', isLogin, function (req, res, next) {
    res.locals.popup = true;

    var person = req.session.person;
    var query = {};
    if (typeof req.query.formId != 'undefined') {
        query.id = req.query.formId;
        req.session.formId = req.query.formId;
    }
    else {
        query.id = req.session.formId;
    }
    app3Service.find3(query).then((results) => {
        if (typeof results === 'undefined') {
            req.flash('error', '申请表不存在');
            return res.redirect('home');
        }
        else if (typeof results[0] === 'undefined') {
            delete formId;
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
            res.locals.result = results[0].result;
            res.locals.submitbtn = (person == '1' ? '提交' : '同意');
            res.locals.nextperson = results[0].nextperson;
            req.session.nextperson = results[0].nextperson;
            res.render('thirdlevel');
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    res.locals.popup = true;

    var person = req.session.person;
    var nextperson = req.session.nextperson;

    var app3 = {};

    if (person == '1') {
        //normal worker
        var workshop = req.session.workshop;
        var actualworkshop = req.body.workshop;
        if (nextperson == '10') {
            //create a new application
            confService.getApplyCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApplyCount未存储');
                    return res.redirect('/app3');
                } else {
                    var date = getDate();
                    var count = counts[0].applycount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var applyid = date + fixCount;

                    //id is the same with applyid
                    app3.id = applyid;
                    app3.workshop = req.session.workshop;
                    app3.telephone = req.body.telephone;
                    app3.fax = req.body.fax;
                    app3.applyid = applyid;
                    app3.section = req.body.section;
                    app3.reason = req.body.reason;
                    app3.sqstarttime = getFormatTime(req.body.sqstarttime);
                    app3.sqendtime = getFormatTime(req.body.sqendtime);
                    app3.noticedepart = req.body.noticedepart;
                    app3.shigongfang = req.body.shigongfang;
                    app3.plan = req.body.plan;
                    app3.techplan = req.body.techplan;
                    app3.secureplan = req.body.secureplan;
                    app3.applytime = getTime();
                    app3.nextperson = '20';

                    app3Service.createApp3(app3).then((result) => {
                        req.flash('success', '提交成功');
                        return res.redirect('home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app3');
                    });
                }
            });
        }
        else if (workshop != actualworkshop) {
            // only the exact workshop manager can check the application
            req.flash('error', '无权查看其他车间');
            return res.redirect('/app3');
        } else if (nextperson == '20') {
            // update the application before workshop manager check
            app3.telephone = req.body.telephone;
            app3.fax = req.body.fax;
            app3.section = req.body.section;
            app3.reason = req.body.reason;
            app3.sqstarttime = getFormatTime(req.body.sqstarttime);
            app3.sqendtime = getFormatTime(req.body.sqendtime);
            app3.noticedepart = req.body.noticedepart;
            app3.shigongfang = req.body.shigongfang;
            app3.plan = req.body.plan;
            app3.techplan = req.body.techplan;
            app3.secureplan = req.body.secureplan;
            app3.nextperson = '20';
            app3.formId = req.body.applyid;

            app3Service.updateApp3(app3).then((result) => {
                req.flash('success', '更新成功');
                return res.redirect('/app3');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('/app3');
            });
        } else if (nextperson == '29') {
            // can not update the application because the workshop manager has refused it
            req.flash('error', '车间主任不同意');
            return res.redirect('/app3');
        } else if (nextperson == '60') {
            // finish the result
            app3.result = req.body.result;
            app3.nextperson = '70';
            app3.formId = req.body.applyid;

            app3Service.updateResult(app3).then((result) => {
                req.flash('success', '销点完成');
                return res.redirect('/app3');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('/app3');
            });
        } else if (nextperson == '70') {
            // the application is closed
            req.flash('error', '填写完毕 不能更新');
            return res.redirect('/app3');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('/app3');
        }
    }
    else if (person == '2') {
        // workshop manager
        var workshop = req.session.workshop;
        var actualworkshop = req.body.workshop;
        if (workshop != actualworkshop) {
            // only the exact workshop manager can check the application
            req.flash('error', '无权查看其他车间');
            return res.redirect('/app3');
        }
        else if (nextperson == '20') {
            // update the application before result
            confService.getApproveCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApproveCount未存储');
                    return res.redirect('/app3');
                } else {
                    var date = getDate();
                    var count = counts[0].approvecount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var approveid = date + fixCount;

                    app3.approveid = approveid;
                    app3.workshopmgr = req.body.workshopmgr;
                    app3.workshopmgrtime = getTime();
                    if (req.body.approve == 'true') {
                        app3.nextperson = '60';
                    }
                    else {
                        app3.nextperson = '29';
                    }
                    app3.formId = req.body.applyid;


                    app3Service.updateWorkshopMgr(app3).then((result) => {
                        req.flash('success', '审批完成');
                        return res.redirect('/app3');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app3');
                    });
                }
            });
        } else if (nextperson == '29') {
            // can not update
            req.flash('error', '您已不同意该表格');
            return res.redirect('/app3');
        } else if (nextperson == '60' || nextperson == '70') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('/app3');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('/app3');
        }
    } else {
        // person wrong
        req.flash('error', '账号角色错误');
        return res.redirect('/app3');
    }
});

module.exports = router;