var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getNoticedepart = require('../others/util').getNoticedepart;
var getFormatTime = require('../others/util').getFormatTime;
var app2Service = require('../services/app2Service');
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
                        req.session.nextperson = results[0].nextperson;
                        res.render('secondlevel');
                    }
                });
            }
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    var person = req.session.userId.slice(0, 1);
    var nextperson = req.session.nextperson;

    var app2 = {};

    if (person == '1') {
        //normal worker
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
                    app2.workshop = req.session.userId.slice(1);
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
                        console.log('success');
                        return res.redirect('home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app2');
                    });
                }
            });
        } else if (nextperson == '2') {

        } else if (nextperson == '6') {

        } else if (nextperson == '7') {

        } else {

        }
    } else if (person == '2') {

    }
});

module.exports = router;