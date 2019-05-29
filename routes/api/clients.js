const express = require('express');
const router = express.Router();

//Item Model
const Client = require('../../models/Client');

// @route   GET api/clients
// @desc    Get All Clients
// @access  Public
router.get('/', (req, res) => {
  Client.find()
    .sort({ date: -1 })
    .then(clients => res.json(clients));
});

// @route   POST api/clients
// @desc    Create A Client
// @access  Public
router.post('/', (req, res) => {
  const newClient = new Client({
    name: req.body.name,
    surname: req.body.surname
  });

  newClient.save().then(client => res.json(client));
});

// @route   DELETE api/client/:id
// @desc    Delete A Client
// @access  Public
router.delete('/:id', (req, res) => {
  Client.findById(req.params.id)
    .then(client => client.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});



//Export router
module.exports = router;