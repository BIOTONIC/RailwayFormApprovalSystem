var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getNoticedepart = require('../others/util').getNoticedepart;
var getFormatTime = require('../others/util').getFormatTime;
var getNormalTime = require('../others/util').getNormalTime;
var app2Service = require('../services/app2Service');
var confService = require('../services/confService');

router.get('/create', isLogin, function (req, res, next) {
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
    req.session.nextperson = '1';
    res.render('secondlevel');
});

router.get('/', isLogin, function (req, res, next) {
    var person = req.session.person;
    var query = {};
    if (typeof req.query.formId != 'undefined') {
        query.id = req.query.formId;
        req.session.formId = req.query.formId;
    }
    else {
        query.id = req.session.formId;
    }
    app2Service.find3(query).then((results) => {
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
            res.locals.result = results[0].result;
            res.locals.submitbtn = (person=='1'?'提交':'同意');
            req.session.nextperson = results[0].nextperson;
            res.render('secondlevel');
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    var person = req.session.person;
    var nextperson = req.session.nextperson;

    var app2 = {};

    if (person == '1') {
        //normal worker
        var workshop = req.session.workshop;
        var actualworkshop = req.body.workshop;
        if (nextperson == '1') {
            //create a new application
            confService.getApplyCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApplyCount未存储');
                    return res.redirect('/app2');
                } else {
                    var date = getDate();
                    var count = counts[0].applycount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var applyid = date + fixCount;

                    //id is the same with applyid
                    app2.id = applyid;
                    app2.workshop = req.session.workshop;
                    app2.telephone = req.body.telephone;
                    app2.fax = req.body.fax;
                    app2.applyid = applyid;
                    app2.section = req.body.section;
                    app2.reason = req.body.reason;
                    app2.sqstarttime = getFormatTime(req.body.sqstarttime);
                    app2.sqendtime = getFormatTime(req.body.sqendtime);
                    app2.noticedepart = getNoticedepart(req.body.noticedepart);
                    app2.shigongfang = req.body.shigongfang;
                    app2.plan = req.body.plan;
                    app2.techplan = req.body.techplan;
                    app2.secureplan = req.body.secureplan;
                    app2.applytime = getTime();
                    app2.nextperson = '2';

                    app2Service.createApp2(app2).then((result) => {
                        req.flash('success', '提交成功');
                        return res.redirect('home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app2');
                    });
                }
            });
        } else if (workshop != actualworkshop) {
            // only the exact workshop manager can check the application
            req.flash('error', '无权查看其他车间');
            return res.redirect('/app2');
        } else if (nextperson == '2') {
            // update the application before workshop manager check
            app2.telephone = req.body.telephone;
            app2.fax = req.body.fax;
            app2.section = req.body.section;
            app2.reason = req.body.reason;
            app2.sqstarttime = getFormatTime(req.body.sqstarttime);
            app2.sqendtime = getFormatTime(req.body.sqendtime);
            app2.noticedepart = getNoticedepart(req.body.noticedepart);
            app2.shigongfang = req.body.shigongfang;
            app2.plan = req.body.plan;
            app2.techplan = req.body.techplan;
            app2.secureplan = req.body.secureplan;
            app2.nextperson = '2';
            app2.formId = req.body.applyid;

            app2Service.updateApp2(app2).then((result) => {
                req.flash('success', '更新成功');
                return res.redirect('/app2');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('/app2');
            });
        } else if (nextperson == '6') {
            // finish the result
            app2.result = req.body.result;
            app2.nextperson = '7';
            app2.formId = req.body.applyid;

            app2Service.updateResult(app2).then((result) => {
                req.flash('success', '销点完成');
                return res.redirect('/app2');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('/app2');
            });
        } else if (nextperson == '7') {
            // the application is closed
            req.flash('error', '填写完毕 不能更新');
            return res.redirect('/app2');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('/app2');
        }
    } else if (person == '2') {
        // workshop manager
        if (nextperson == '2') {
            // update the application before result
            confService.getApproveCount().then((counts) => {
                if (typeof counts === 'undefined' || counts.length == 0) {
                    req.flash('error', 'ApproveCount未存储');
                    return res.redirect('/app2');
                } else {
                    var date = getDate();
                    var count = counts[0].approvecount + 1;
                    var fixCount = getFixNumber(count, 3);
                    var approveid = date + fixCount;

                    app2.approveid = approveid;
                    app2.workshopmgr = req.body.workshopmgr;
                    app2.workshopmgrtime = getTime();
                    app2.nextperson = '6';
                    app2.formId = req.body.applyid;


                    app2Service.updateWorkshopMgr(app2).then((result) => {
                        req.flash('success', '审批完成');
                        return res.redirect('/app2');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app2');
                    });
                }
            });
        } else if (nextperson == '6' || nextperson == '7') {
            // can not update
            req.flash('error', '审批结束 不能更新');
            return res.redirect('/app2');
        } else {
            // no other state for nextperson
            req.flash('error', '表格状态错误');
            return res.redirect('/app2');
        }
    } else {
        // person wrong
        req.flash('error', '账号角色错误');
        return res.redirect('/app2');
    }
});

module.exports = router;