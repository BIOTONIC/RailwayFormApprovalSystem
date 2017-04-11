var App2 = require('../models/app2');

module.exports = {
    createApp2: function createApp2(app2) {
        return App2.create({
            id:app2.id,
            workshop:app2.workshop,
            telephone:app2.telephone,
            fax:app2.fax,
            applyid:app2.applyid,
            section:app2.section,
            reason:app2.reason,
            sqstarttime:app2.sqstarttime,
            sqendtime:app2.sqendtime,
            noticedepart:app2.noticedepart,
            shigongfang:app2.shigongfang,
            plan:app2.plan,
            techplan:app2.techplan,
            secureplan:app2.secureplan,
            applytime:app2.applytime,
            nextperson:app2.nextperson,
        });
    },
    updateWorkshopMgr: function updateWorkshopMgr(mgr) {
        return App2.update({
            workshopmgr: mgr.workshopmgr,
            workshopmgrtime: mgr.workshopmgrtime
        });
    },
    updateResult: function updateResult(result) {
        return App2.update({
            result: result
        });
    },
    find: function find(need, query) {
        return App2.findAll({
            attributes: need,
            where: query
        });
    },
    find2: function find2(need, order) {
        return App2.findAll({
            attributes: need,
            order: order
        });
    },
    find3: function find3(query) {
        return App2.findAll({
            where: query
        });
    }
};

