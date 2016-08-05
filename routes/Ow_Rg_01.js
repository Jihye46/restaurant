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

/* GET Page. */
router.get('/', function(req, res, next) {
res.render('Ow_Rg_01');

});


router.post('/', function(req,res){
	var restaurant = {
			'restaurant_name':req.body.restaurant_name,
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
    else {
    	res.redirect('/Ow_Rg_01');
   	   //res.send("<script>alert('저장되었습니다.');</script>");
    	
    }
    
     console.log(query);
   
});
	
});

router.post('/menu', function(req,res){
	var menu = {
			'restaurant_no':1,
			'menu_name':req.body.menu,
            'price':req.body.price
            };
	var query = connection.query('insert into menu set ?',menu,function(err,result){
    if (err) {
        console.error(err);
        throw err;
    }
    else {
    	res.redirect('/Ow_Rg_01');
   	   //res.send("<script>alert('저장되었습니다.');</script>");
    	
    }
    
     console.log(query);
   
});
	
});

module.exports = router;
