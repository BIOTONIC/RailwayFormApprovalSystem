var App3 = require('../models/app3');

module.exports = {
    createApp3: function createApp3(app3) {
        return App3.create({
            id:app3.id,
            workshop:app3.workshop,
            telephone:app3.telephone,
            fax:app3.fax,
            applyid:app3.applyid,
            section:app3.section,
            reason:app3.reason,
            sqstarttime:app3.sqstarttime,
            sqendtime:app3.sqendtime,
            noticedepart:app3.noticedepart,
            shigongfang:app3.shigongfang,
            plan:app3.plan,
            techplan:app3.techplan,
            secureplan:app3.secureplan,
            applytime:app3.applytime,
            nextperson:app3.nextperson,
        });
    },
    updateWorkshopMgr: function updateWorkshopMgr(mgr) {
        return App3.update({
            workshopmgr: mgr.workshopmgr,
            workshopmgrtime: mgr.workshopmgrtime
        });
    },
    updateResult: function updateResult(text) {
        return App3.update({
            result: text
        });
    },
    find: function find(need, query) {
        return App3.findAll({
            attributes: need,
            where: query
        });
    },
    find2: function find2(need, order) {
        return App3.findAll({
            attributes: need,
            order: order
        });
    },
    find3: function find3(query) {
        return App3.findAll({
            where: query
        });
    }
};
