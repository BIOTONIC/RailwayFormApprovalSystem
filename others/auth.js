var conf = require('./config');

module.exports = {
    isLogin: function isLogin(req, res, next) {
        if (req.session.userId != -1) {
            if (!req.session.userId) {
                req.flash('error', '请先登录');
                return res.redirect('/login');
            }
            if (conf.sessionPool[req.session.userId].id != req.session.id) {
                req.flash('error', '您已下线');
                return res.redirect('/login');
            }
        }
        next();
    },

    notLogin: function notLogin(req, res, next) {
        if (req.session.userId && conf.sessionPool[req.session.userId] == req.session) {
            req.flash('error', "已经登录");
            return res.redirect('/home');
        }
        next();
    }
}