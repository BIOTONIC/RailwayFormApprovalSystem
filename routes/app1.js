var express = require('express');
var router = express.Router();

var isLogin = require('../others/auth').isLogin;
var getDate = require('../others/util').getDate;
var getTime = require('../others/util').getTime;
var getFixNumber = require('../others/util').getFixNumber;
var getNoticedepart = require('../others/util').getNoticedepart;
var app1Service = require('../services/app1Service');
var workshopService = require('../services/workshopService');
var confService = require('../services/confService');

router.get('/', isLogin, function (req, res, next) {
    // for example: userId is 101, so workshopId is 01
    var person = req.session.userId.slice(0, 1);
    var workshopId = req.session.userId.slice(1);
    workshopService.findNameById(workshopId).then((results) => {
        if (results.length == 0) {
            req.flash('error', '车间不存在');
            return res.redirect('／home');
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
                res.locals.techdepart = '';
                res.locals.pfstarttime ='';
                res.locals.pfendtime = '';
                res.locals.securedepart = '';
                res.locals.manager = '';
                // managertime will be add in manager
                // no need to render separately
                //res.locals.managertime = '';
                res.locals.result = '';
                res.locals.applytime = '系统自行分配';
                req.session.nextperson = '1';
                res.render('firstlevel');
            } else {
                // if there is a request form id
                // open a already exist application
                var query = {};
                query.id = req.session.formId;
                app1Service.find3(query).then((results) => {
                    if (typeof results === 'undefined') {
                        req.flash('error', '申请表不存在');
                        return res.redirect('/home');
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
                        res.locals.techdepart = results[0].techdepart;
                        res.locals.techtime = results[0].techtime;
                        res.locals.pfstarttime = results[0].pfstarttime;
                        res.locals.pfendtime = results[0].pfendtime;
                        res.locals.securedepart = results[0].securedepart;
                        res.locals.securetime = results[0].securetime;
                        res.locals.manager = results[0].manager;
                        res.locals.managertime = results[0].managertime;
                        res.locals.result = results[0].result;
                        req.session.nextperson = results[0].nextperson;
                        res.render('firstlevel');
                    }
                });
            }
        }
    });
});

router.post('/', isLogin, function (req, res, next) {
    var person = req.session.userId.slice(0, 1);
    var nextperson = req.session.nextperson;

    var app1 = {};

    if (person == '1'){
        if(nextperson == '1'){
            // create a new application
            confService.getCount().then((counts) => {
                if (counts.length == 0) {
                    req.flash('error', 'Count未存储');
                    return res.redirect('/app1');
                } else {
                    var date = getDate();
                    var count = counts[0].count + 1;
                    var fixCount = getFixNumber(count, 3);
                    var applyid = date + fixCount;

                    //id is the same with applyid
                    app1.id = applyid;
                    app1.workshop = req.session.userId.slice(1);
                    app1.telephone = req.body.telephone;
                    app1.fax = req.body.fax;
                    app1.applyid = applyid;
                    app1.section = req.body.section;
                    app1.reason = req.body.reason;
                    app1.sqstarttime = req.body.sqstarttime;
                    app1.sqendtime = req.body.sqendtime;
                    app1.noticedepart = getNoticedepart(req.body.noticedepart);
                    // NOTICE!!!
                    //
                    // 先贴上原本的错误范例
                    // app1.constructor = req.body.shigongfang;
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
                    app1.nextperson = '2';

                    app1Service.createApp1(app1).then((result) => {
                        req.flash('success', '提交成功');
                        console.log('success');
                        return res.redirect('/home');
                    }).catch((error) => {
                        req.flash('error', '提交失败');
                        return res.redirect('/app1');
                    });
                }
            });
        }else if(nextperson == '2'){
            // update the application before workshop manager check

            //play a small trick here because applyid equals to form id
            var formId = req.body.applyid;
            app1.telephone = req.body.telephone;
            app1.fax = req.body.fax;
            app1.section = req.body.section;
            app1.reason = req.body.reason;
            app1.sqstarttime = req.body.sqstarttime;
            app1.endtime = req.body.endtime;
            app1.noticedepart = getNoticedepart(req.body.noticedepart);
            app1.shigongfang = req.body.shigongfang;
            app1.plan = req.body.plan;
            app1.techplan = req.body.techplan;
            app1.secureplan = req.body.secureplan;
            // nextperson will not change
            app1.nextperson = '2';

            app1Service.updateApp1(app1).then((result)=>{
                req.flash('success','更新成功');
                return res.redirect('/app1');
            }).catch((error)=>{
                req.flash('error','更新失败');
                return res.redirect('/app1');
                // TODO
            })
        }else if (nextperson in ['2','3','4','5']){
            // can not post under check
        }else if (nextperson == '6'){
            // finish the result
        }else if (nextperson == '7'){
            // the application is closed
        }else{
            // no other state for nextperson
        }
    }


});

module.exports = router;