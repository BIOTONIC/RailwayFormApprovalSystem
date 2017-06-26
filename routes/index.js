var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (!req.session.userId && !req.session.person && !req.session.workshop) {
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }

});

router.use('/login', require('./login'));
router.use('/home', require('./home'));
router.use('/app1', require('./app1'));
router.use('/app2', require('./app2'));
router.use('/app3', require('./app3'));
router.use('/loginLog', require('./loginLog'));
router.use('/dyyydl',require('./dyyydl'));

// 404 page
router.use(function (req, res) {
    if (!res.headersSent) {
        res.status(404).render('error');
    }
});

module.exports = router;
