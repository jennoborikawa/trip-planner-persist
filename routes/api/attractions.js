var router = require('express').Router(); 
module.exports = router; 


router.get('/api/hotels', function(req, res, next){

}); 

router.get('/api/day/:dayId/restaurants/:restaurantId', function(req, res, next){
	res.send('You are the best!'); 
}); 


router.get('/api/activities', function(req, res, next){

}); 