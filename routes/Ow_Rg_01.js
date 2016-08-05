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
			//restaurant_no에 현재 owner가 등록한 레스토랑 넘버 가져와야 함
			'restaurant_no':2,
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


router.get('/',function(req,res,next)
		{	
			
			// 앞으로 datas에는  owner가 레스토랑 등록했을 때 부여 된 restaurant_no값 들어가야 함  
			var datas = '1';
			var query = connection.query('select restaurant_name,restaurant_opening_time,restaurant_closing_time,restaurant_type,restaurant_address,restaurant_tel from restaurant where restaurant_no=?' ,datas, function(err,row){
				var menu_query = connection.query('select menu_name,price from menu where restaurant_no=?' , datas, function(err_menu,row_menu){
				//레스토랑 정보 입력한 적이 없는 owner인 경우
				//row가 null이면 메뉴도 등록이 될 수 없으므로 null
				if(row =='')
					{
					 res.render('Ow_Rg_01', {title:"OSHOW 레스토랑 정보등록", row:"", row_menu:""});
					}
			    else {
			    	console.log("레스토랑 정보 조회 결과 확인 : ",row);
			    	console.log("메뉴 정보 조회 결과 확인 : ",row_menu);
		            res.render('Ow_Rg_01', {title:"OSHOW 레스토랑 정보등록", row:row[0], row_menu:row_menu[0]});
			    	
			    }
			    
			     console.log(query);
			     console.log(menu_query);
			});
		});	
	});
		    
	

module.exports = router;
