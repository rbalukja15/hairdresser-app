const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

//Event Model
const Event = require('../../models/Event');

const moment = require("moment");

// @route   GET api/event
// @desc    Get All Events
// @access  Public
router.get('/', (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(events => res.json(events));
});

// @route   GET api/event/:id
// @desc    Get One Event
// @access  Private
router.get("/:id", auth,(req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if(!event) {
        return res.status(404).json({
            message: "Event not found with id " + req.params.id
        });            
    }
      res.json(event)}
    )
    .catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).json({
              message: "Event not found with id " + req.params.id
          });                
      }
      return res.status(500).json({
          message: "Error retrieving event with id " + req.params.id
      });
  });
});

// @route   POST api/event
// @desc    Create An Event
// @access  Public
router.post('/',  (req, res) => {

  const newEvent = new Event({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  //console.log(req.body); return;

  newEvent.save(function(err, resp) {
    if (err) {
      res.send({
        message: 'Something went wrong'
      });
      // console.log(err);
    } else {
      res.send({
        message: 'The event has been saved'
      });
      // console.log("success");
    }

  });
});

// @route   DELETE api/event/:id
// @desc    Delete An Event
// @access  Public
router.delete('/:id', auth,(req, res) => {
  Event.findById(req.params.id)
    .then(event => event.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


// @route   EDIT api/event/:id
// @desc    EDIT An Event
// @access  Private
router.put("/:id",  auth,(req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    },
    { new: true }
  )
    .then(event => {
      if (!event) {
        return res
          .status(404)
          .json({ msg: "Event not found with id " + req.params.id });
      }
      res.json(event);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Event not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating Event with id " + req.params.id });
    });
});


//Export router
module.exports = router;