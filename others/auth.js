module.exports = {
    isLogin: function isLogin(req, res, next) {
        if (!req.session.userId) {
            req.flash('error', '请先登录');
            return res.redirect('/login');
        }
        next();
    },

    notLogin: function notLogin(req, res, next) {
        if (req.session.userId) {
            req.flash('error', "已经登录");
            return res.redirect('back');
        }
        next();
    }
}