var router = require('express').Router();
var Day = require('../models/day');
var Meal = require('../models/meal');
var Restaurant = require('../models/restaurant');
var Place = require('../models/place');
var Stay = require('../models/stay');
var Hotel = require('../models/hotel');
var Adventure = require('../models/adventure');
var Activity = require('../models/activity');

module.exports = router;

router.post('/', function(req, res, next){
  Day.create()
    .then(function(day){
      var obj = {};
      obj.id = day.id;
      obj.hotels = [];
      obj.activities = [];
      obj.restaurants = [];
      res.send(obj);
    })
    .catch(next);
});



router.delete('/:dayId', function(req,res,next){
  // var stay = Stay.findAll({
  //   where:{
  //     dayId: req.params.dayId
  //   }
  // });

  //   var meal = Meal.findAll({
  //   where:{
  //     dayId: req.params.dayId
  //   }
  // });

  //   var stay = Stay.findAll({
  //   where:{
  //     dayId: req.params.dayId
  //   }
  // })

  Day.destroy({
    where: {
      id: req.params.dayId
    }
  })
  .then(function(){
    console.log('day destroyed');
    res.sendStatus(200);
  })
  .catch(next);    

})


router.get('/', function(req, res, next){
  var meals = {
    model: Meal,
    include: [ { 
      model: Restaurant,
      include: [ Place ]
    } ]
  };
  var stays = {
    model: Stay,
    include: [ { 
      model: Hotel,
      include: [ Place ]
    } ]
  };
  var adventures = {
    model: Adventure,
    include: [ {
      model: Activity,
      include: [ Place ]
    }]
  };

  Day.findAll({ include: [ meals, stays, adventures ]})
    .then(function(days){
      return days.map(function(day){
        var obj = {};
        obj.id = day.id;
        obj.restaurants = day.meals.map(function(meal){ 
          return meal.restaurant;
        });
        obj.hotels = day.stays.map(function(stay){
          return stay.hotel;
        });
        obj.activities = day.adventures.map(function(adventure){
          return adventure.activity;
        });
        return obj;
      });
    })
    .then(function(days){
      res.send(days);
    })
    .catch(next);
});

router.post('/:dayId/restaurants/:itemId',function(req,res,next){
  Meal.create({
      restaurantId: req.params.itemId,
      dayId: req.params.dayId
  })
  .then(function(){
    console.log('meal created')
    res.sendStatus(200)
  })
  .catch(next);
});

router.post('/:dayId/hotels/:itemId',function(req,res,next){
  Stay.create({
      hotelId: req.params.itemId,
      dayId: req.params.dayId
  })
  .then(function(){
    console.log('stay created')
    res.sendStatus(200)
  })
  .catch(next);
});

router.post('/:dayId/activities/:itemId',function(req,res,next){
  Adventure.create({
      activityId: req.params.itemId,
      dayId: req.params.dayId
  })
  .then(function(){
    console.log('adventure created')
    res.sendStatus(200)
  })
  .catch(next);
});

router.delete('/:dayId/restaurants/:itemId',function(req,res,next){
  Meal.destroy({
    where:{
      restaurantId: req.params.itemId,
      dayId: req.params.dayId   
    }
  })
  .then(function(){
    console.log('meal destroyed');
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/:dayId/hotels/:itemId',function(req,res,next){
  Stay.destroy({
    where:{
      hotelId: req.params.itemId,
      dayId: req.params.dayId   
    }
  })
  .then(function(){
    console.log('stay destroyed');
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/:dayId/activities/:itemId',function(req,res,next){
  Adventure.destroy({
    where:{
      activityId: req.params.itemId,
      dayId: req.params.dayId   
    }
  })
  .then(function(){
    console.log('adventure destroyed');
    res.sendStatus(200);
  })
  .catch(next);
});