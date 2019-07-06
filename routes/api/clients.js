const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Client = require("../../models/Client");

// @route   GET api/clients
// @desc    Get All Clients
// @access  Public
router.get("/", (req, res) => {
  Client.find()
    .sort({ date: -1 })
    .then(clients => res.json(clients));
});

// @route   GET api/clients/:id
// @desc    Get One Client
// @access  Private
router.get("/:id", auth, (req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      if (!client) {
        return res.status(404).json({
          message: "Client not found with id " + req.params.id
        });
      }
      res.json(client);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Client not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Error retrieving client with id " + req.params.id
      });
    });
});

// @route   POST api/clients
// @desc    Create A Client
// @access  Private
router.post("/", auth, (req, res) => {
  const newClient = new Client({
    name: req.body.name,
    surname: req.body.surname
  });

  newClient.save().then(client => res.json(client));
});

// @route   DELETE api/client/:id
// @desc    Delete A Client
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Client.findById(req.params.id)
    .then(client => client.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   EDIT api/clients/:id
// @desc    EDIT A client
// @access  Private
router.put("/:id", auth, (req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Client.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname
    },
    { new: true }
  )
    .then(client => {
      if (!client) {
        return res
          .status(404)
          .json({ msg: "Client not found with id " + req.params.id });
      }
      res.json(client);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Client not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating client with id " + req.params.id });
    });
});

//Export router
module.exports = router;
