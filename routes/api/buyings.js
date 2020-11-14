const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Buying Model
const Buying = require("../../models/Buying");

// @route   GET api/buyings
// @desc    Get All Buyings
// @access  Public
router.get("/", (req, res) => {
  Buying.find()
    .sort({ date: -1 })
    .then((buyings) => res.json(buyings));
});

// @route   GET api/buyings/:id
// @desc    Get One Buying
// @access  Private
router.get("/:id", (req, res) => {
  Buying.findById(req.params.id)
    .then((buying) => {
      if (!buying) {
        return res.status(404).json({
          message: "Buying not found with id " + req.params.id,
        });
      }
      res.json(buying);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Buying not found with id " + req.params.id,
        });
      }
      return res.status(500).json({
        message: "Error retrieving buying with id " + req.params.id,
      });
    });
});

// @route   POST api/buyings
// @desc    Create a Buying
// @access  Private
router.post("/", auth, (req, res) => {
  const newBuying = new Buying({
    clientName: req.body.clientName,
    invoiceType: req.body.invoiceType,
    invoiceData: req.body.rows,
    total: req.body.total,
  });

  newBuying
    .save()
    .then((buying) => res.json(buying))
    .catch((err) => {
      return res.status(500).json({
        message: "Error saving buying",
      });
    });
});

// @route   DELETE api/buyings/:id
// @desc    Delete Buying
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Buying.findById(req.params.id)
    .then((buying) => buying.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   EDIT api/buyings/:id
// @desc    EDIT A Buying
// @access  Private
router.put("/:id", (req, res) => {
  Buying.findByIdAndUpdate(
    req.params.id,
    {
      clientName: req.body.clientName,
      invoiceType: req.body.invoiceType,
      invoiceData: req.body.rows,
      total: req.body.total,
    },
    { new: true }
  )
    .then((buying) => {
      if (!buying) {
        return res
          .status(404)
          .json({ msg: "Buying not found with id " + req.params.id });
      }
      res.json(buying);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Buying not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating buying with id " + req.params.id });
    });
});

//Export router
module.exports = router;
