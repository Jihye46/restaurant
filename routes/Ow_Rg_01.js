var express = require('express');
var router = express.Router();

/* GET Page. */
router.get('/', function(req, res, next) {
res.render('Ow_Rg_01');

});

module.exports = router;
