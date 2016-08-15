var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var multer = require('multer');
var connection = mysql.createConnection({
	host : '14.63.196.48' ,
	port : '3306',
	user : 'root',
	password : 'Rkakdqpfm!00',
	database : 'oshow',
	multipleStatements : true
});

/* 메뉴 등록 */
//메뉴 이름 뒤에 레스토랑 이름붙이거나 다른 레스토랑과 구별할 수 있도록 해야 함
var upload = multer({ 
	dest: '../public/images/menus/'});
var type = upload.single('image');
var fs = require('fs');

router.get('/',function(req,res,next)
		{	
			
			// 앞으로 datas에는  owner가 레스토랑 등록했을 때 부여 된 restaurant_no값 들어가야 함  
			var datas = '45';
			var query = connection.query('select restaurant_name,restaurant_opening_time,restaurant_closing_time,restaurant_type,restaurant_address,restaurant_tel,restaurant_picture_url,restaurant_deposit_member,restaurant_deposit_menu,restaurant_introduce from restaurant where restaurant_no=?' , datas, function(err,row){
				var menu_query = connection.query('select menu_name,price from menu where restaurant_no=?' , '1', function(err_menu,row_menu){
					var holiday_query = connection.query('select holiday_date from holiday where restaurant_no=?' , datas, function(err_holiday,row_holiday){
				/* 레스토랑 정보 입력한 적이 없는 owner인 경우
				row가 null이면 메뉴,휴무일도 등록이 될 수 없으므로 null */
				if(row == '')
					{
					 res.render('Ow_Rg_01', {title:"OSHOW 레스토랑 정보등록", row:"", row_menu:"", row_holiday:""});
					}
			    else {
			    	console.log("레스토랑 정보 조회 결과 확인 : ", row);
			    	console.log("메뉴 정보 조회 결과 확인 : ", row_menu);
			    	console.log("휴무일 정보 조회 결과 확인 : ", row_holiday);
			    	//console.log("row.restaurant_picture_url : " , row[0].restaurant_picture_url);
			    		
			    	//row_menu의 경우 여러개 인 경우 for문으로 출력해주기 !수정
		            res.render('Ow_Rg_01', {title:"OSHOW 레스토랑 정보등록", row:row[0], row_menu:row_menu[0], row_holiday: row_holiday[0]});
			    	
			    }
			    
			     console.log(query);
			     console.log(menu_query);
				}); //holiday
			}); //menu
		});	//restaurant
			
	}); //router.get

router.post('/', type, function(req,res){
	/* 메뉴 이미지*/
	 /** The original name of the uploaded file
    stored in the variable "originalname". **/
	var target_path = '../public/images/menu/' + req.file.originalname;
	var tmp_path = req.file.path;
	/** A better way to copy the uploaded file. **/
	 var src = fs.createReadStream(tmp_path);

	var dest = fs.createWriteStream(target_path);
	console.log('메뉴 이미지 저장 경로 : ' + target_path);
	src.pipe(dest);
	
	/*입력 값 DB저장 */
	var restaurant = {
			'restaurant_name':req.body.restaurant_name,
	        'restaurant_opening_time':req.body.restaurant_opening_time,
	        'restaurant_closing_time':req.body.restaurant_closing_time,
	        'restaurant_type':req.body.restaurant_type,
	        'restaurant_address':req.body.restaurant_address,
	        'restaurant_tel':req.body.restaurant_tel,
	        'restaurant_picture_url' : target_path,
	        'restaurant_deposit_member' : req.body.restaurant_deposit_member,
	        'restaurant_deposit_menu' :req.body.restaurant_deposit_menu,
	       'restaurant_introduce' : req.body.restaurant_introduce,
	        'holiday_date' : req.body.holiday_date
	        };

	
	var query = connection.query('CALL ps_SetRestaurantInfo (?, ?, ?)', [restaurant.restaurant_name,restaurant.restaurant_address, restaurant.holiday_date ], function(err,result){
    if (err) {
        console.error(err);
        throw err;
    }
    else {
    				res.redirect('/Ow_Rg_01');
    		}
    		    	
	});
    
     console.log(query);
   
});
	


router.post('/menu', function(req,res){
	var menu = {
			//!!!restaurant_no에 현재 owner가 등록한 레스토랑 넘버 가져와야 함
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



/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/

router.post('/file', type, function (req,res) {

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = '../public/images/menu/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
 
  var dest = fs.createWriteStream(target_path);
  console.log('메뉴 이미지 저장 경로 : ' + target_path);
  src.pipe(dest);
  //src.on('end', function() { res.render('complete'); });
  //src.on('error', function(err) { res.render('error'); });

  res.redirect('/Ow_Rg_01');
  
});
	

module.exports = router;
