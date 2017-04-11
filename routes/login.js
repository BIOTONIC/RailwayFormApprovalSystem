var express = require('express');
var router = express.Router();

var notLogin = require('../others/auth').notLogin;
var userService = require('../services/userService');

router.get('/', notLogin, function (req, res, next) {
    res.render('login');
});

router.post('/', notLogin, function (req, res, next) {
        var name = req.body.username;
        var password = req.body.password;

        userService.findUserByName(name).then((results) => {
            if (results.length == 0) {
                req.flash('error', '用户名不存在');
                return res.redirect('/login');
            }
            else if (results[0].password != password) {
                req.flash('error', '用户名或密码错误');
                return res.redirect('/login');
            }
            else {
                req.flash('success', '登录成功');
                delete password;
                // can not use req.session.id because it is a reserved word
                req.session.userId = results[0].id;
                res.cookie('id', req.session.userId);
                return res.redirect('/home');
            }
        });
    }
);

module.exports = router;