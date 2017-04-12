var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getNoticedepart = require('../others/util').getNoticedepart;
var getFormatTime =require('../others/util').getFormatTime;
var app3Service = require('../services/app3Service');
var workshopService = require('../services/workshopService');
var confService = require('../services/confService');

router.get('/', isLogin, function (req, res, next) {
    // for example: userId is 101, so workshopId is 01
    var person = req.session.userId.slice(0, 1);
    var workshopId = req.session.userId.slice(1);
    workshopService.findNameById(workshopId).then((results) => {
        if (results.length == 0) {
            req.flash('error', '车间不存在');
            return res.redirect('home');
        } else {
            if (typeof req.session.formId === 'undefined' && person == '1') {
                // if there is no request form id and the person is 1
                // create a new application
                res.locals.workshopId = workshopId;
                res.locals.workshop = results[0].name;
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
                // workshopmgrtime will be add in workshopmgr
                // no need to render separately
                //res.locals.workshopmgrtime = '';
                res.locals.result = '';
                res.locals.applytime = '系统自行分配';
                res.render('secondlevel');
            } else {
                // if there is a request form id
                // open a already exist application
                var query = {};
                query.id = req.session.formId;
                app3Service.find3(query).then((results) => {
                    if (typeof results === 'undefined') {
                        req.flash('error', '申请表不存在');
                        return res.redirect('home');
                    } else {
                        //先一股脑返回所有查询数据
                        res.locals.workshop = results[0].workshop;
                        res.locals.telephone = results[0].telephone;
                        res.locals.fax = results[0].fax;
                        res.locals.applyid = results[0].applyid;
                        res.locals.approveid = results[0].approveid;
                        res.locals.section = results[0].section;
                        res.locals.reason = results[0].reason;
                        res.locals.sqstarttime = results[0].sqstarttime;
                        res.locals.sqendtime = results[0].sqendtime;
                        res.locals.noticedepart = results[0].noticedepart;
                        res.locals.shigongfang = results[0].shigongfang;
                        res.locals.plan = results[0].plan;
                        res.locals.techplan = results[0].techplan;
                        res.locals.secureplan = results[0].secureplan;
                        res.locals.applytime = results[0].applytime;
                        res.locals.workshopmgr = results[0].workshopmgr;
                        res.locals.workshopmgrtime = results[0].workshopmgrtime;
                        res.locals.result = results[0].result;
                        res.render('thirdlevel');
                    }
                });
            }
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    var app3 = {};

    confService.getCount().then((counts) => {
        if (counts.length == 0) {
            req.flash('error', 'Count未存储');
            return res.redirect('back');
        } else {
            var date = getDate();
            var count = counts[0].count + 1;
            var fixCount = getFixNumber(count, 3);
            var applyid = date + fixCount;

            app3.id = applyid;
            app3.workshop = req.session.userId.slice(1);
            app3.telephone = req.body.telephone;
            app3.fax = req.body.fax;
            app3.applyid = applyid;
            app3.section = req.body.section;
            app3.reason = req.body.reason;
            app3.sqstarttime = req.body.sqstarttime;
            app3.sqendtime = req.body.sqendtime;
            var noticedepart = req.body.noticedepart;
            if (typeof noticedepart === 'undefined' || noticedepart.length == 0) {
                app3.noticedepart = '';
            } else {
                var str = '';
                for (var i = 0; i < noticedepart.length - 1; i++) {
                    str = str + noticedepart[i] + '&';
                }
                str = str + noticedepart[noticedepart.length - 1];
                app3.noticedepart = str;
            }
            app3.shigongfang = req.body.shigongfang;
            app3.plan = req.body.plan;
            app3.techplan = req.body.techplan;
            app3.secureplan = req.body.secureplan;
            app3.applytime = getTime();
            app3.nextperson = '2';

            app3Service.createApp3(app3).then((result) => {
                req.flash('success', '提交成功');
                console.log('success');
                return res.redirect('home');
            }).catch((error) => {
                req.flash('error', '提交失败');
                return res.redirect('back');
            });
        }
    });
});

module.exports = router;