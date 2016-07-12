var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Room = require('../models/room.js');


// write JWT validation in middleware function

/* GET users listing. */
router.get('/', function(req, res, next) {
  Room.find(function(err, room) {
      if (err) {
          res.send({info: 'an error occured', error: err});
          return;
      }

      res.json({info: 'list of rooms', data: room});
  });
});

router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, room) {
      if (err) {
          res.send({info: 'an error occured', error: err});
          return;
      }
      if(room) {
          res.json(room);
      }
  });     
});

router.post('/', function(req, res) {
  var newRoom = new Room(req.body);
  newRoom.save(function(err) {
      if (err) {
          res.send({info: 'an error occured', error: err});
          return;
      }
      res.json({info: 'room created'});
  });
});

router.put('/:id', function(req, res) {
  Room.findById(req.params.id, function(err, room) {
      if (err) {
          res.send({info: 'an error occured', error: err});
          return;
      }
      if(room) {
          _.merge(room, req.body);
          room.save(function(err) {
              if (err) {
                res.send({info: 'an error occured saving room', error: err});
                return;
              }
              res.json({info: 'room saved', data: room})
          });
      } else {
        res.send({info: 'room not found to save', error: err});
        return;
      }
  });     
  
});


module.exports = router;