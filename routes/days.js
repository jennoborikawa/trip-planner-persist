var router = require('express').Router();
var Day = require('../models/day');
var Meal = require('../models/meal');
var Restaurant = require('../models/restaurant');
var Place = require('../models/place');
module.exports = router;

router.post('/', function(req, res, next){
  Day.create()
    .then(function(day){
      var obj = { id: day.id },
      obj.hotels = [];
      obj.activities = [];
      obj.restaurants = [];
    })
    .catch(next);
});

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
  Day.findAll({ include: [ meals, stays, adventures ]})
    .then(function(days){
      return days.map(function(day){
        var obj = {};
        obj.id = day.id;
        obj.restaurants = day.meals.map(function(meal){ 
          return meal.restaurant;
        });
        obj.hotels = [];
        obj.activities = [];
        return obj;
      });
    })
    .then(function(days){
      res.send(days);
    })
    .catch(next);
});


