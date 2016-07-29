var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var connection = mysql.createConnection({
	host : '14.63.196.48' ,
	port : '3306',
	user : 'root',
	password : 'Rkakdqpfm!00',
	database : 'oshow'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//insert
router.post('/',function(req,res){
    var restaurant = {'restaurant_name':req.body.restaurant_name,
                'restaurant_opening_time':req.body.restaurant_opening_time,
                'restaurant_closing_time':req.body.restaurant_closing_time,
                'restaurant_type':req.body.restaurant_type,
                'restaurant_address':req.body.restaurant_address,
                'restaurant_tel':req.body.restaurant_tel
                };
    var query = connection.query('insert into restaurant set ?',restaurant,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
       
    });
    res.send('입력되었습니다.');
});


module.exports = router;
