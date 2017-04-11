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
    updateWorkshopMgr: function updateWorkshopMgr(app1) {
        return App1.update({
                workshopmgr: app1.workshopmgr,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
            });
    },
    updateTech: function updateTech(app1) {
        return App1.update({
                techdepart: app1.techdepart,
                pfstarttime: app1.pfendtime,
                pfendtime: app1.pfendtime,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
            });
    },
    updateSecure: function updateSecure(app1) {
        return App1.update({
                securedepart: app1.securedepart,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
            });
    },
    updateManager: function updateManager(app1) {
        return App1.update({
                manager: app1.manager,
                nextperson: app1.nextperson
            },
            {
                where: {
                    id: app1.formId
                }
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