var App1 = require('../models/app1');

module.exports = {
    createApp1: function createApp1(app1) {
        return App1.create({
            id: app1.id,
            workshop: app1.workshop,
            telephone: app1.telephone,
            fax: app1.fax,
            applyid: app1.applyid,
            section: app1.section,
            reason: app1.reason,
            sqstarttime: app1.sqstarttime,
            sqendtime: app1.sqendtime,
            noticedepart: app1.noticedepart,
            shigongfang: app1.shigongfang,
            plan: app1.plan,
            techplan: app1.techplan,
            secureplan: app1.secureplan,
            applytime: app1.applytime,
            nextperson: app1.nextperson
        });
    },
    updateApp1: function updateApp1(app1) {
        return App1.update({
                telephone: app1.telephone,
                fax: app1.fax,
                section: app1.section,
                reason: app1.reason,
                sqstarttime: app1.sqstarttime,
                sqendtime: app1.sqendtime,
                noticedepart: app1.noticedepart,
                shigongfang: app1.shigongfang,
                plan: app1.plan,
                techplan: app1.techplan,
                secureplan: app1.secureplan,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
            });
    },
    updateWorkshopMgr: function updateWorkshopMgr(mgr) {
        return App1.update({
            // 下一个填写表格的是技术科
            nextperson: '3',
            workshopmgr: mgr.workshopmgr,
            workshopmgrtime: mgr.workshopmgrtime
        });
    },
    updateTech: function updateTech(tech) {
        return App1.update({
            // 下一个填写表格的是安全科
            nextperson: '4',
            techdepart: tech.techdepart,
            techtime: tech.techtime,
            pfstarttime: tech.pfstarttime,
            pfendtime: tech.pfendtime
        });
    },
    updateSecure: function updateSecure(secure) {
        return App1.update({
            // 下一个填写表格的是主管段长
            nextperson: '5',
            securedepart: secure.techdepart,
            securetime: secure.securetime
        });
    },
    updateManager: function updateManager(mgr) {
        return App1.update({
            // 下一个填写表格的是销表人员
            nextperson: '6',
            manager: mgr.manager,
            managertime: mgr.managertime
        });
    },
    updateResult: function updateResult(app1) {
        return App1.update(
            {
                result: app1.result,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
            });
    },
    find: function find(need, query) {
        return App1.findAll({
            attributes: need,
            where: query
        });
    },
    find2: function find2(need, order) {
        return App1.findAll({
            attributes: need,
            order: order
        });
    },
    find3: function find3(query) {
        return App1.findAll({
            where: query
        });
    }
};