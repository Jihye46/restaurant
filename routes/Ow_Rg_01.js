var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('Ow_Rg_01', { hg: 'Express!!!' });
  
});

module.exports = router;
