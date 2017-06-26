var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var name = req.body.username;
    var password = req.body.password;

});

module.exports = router;