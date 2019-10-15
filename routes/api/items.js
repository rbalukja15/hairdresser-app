const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Item.find(req.params.id)
    .then(items => {res.json(items)});
});

// @route   GET api/items/:id
// @desc    Get One Items
// @access  Public
router.get("/:id", auth,(req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      if(!item) {
        return res.status(404).json({
            message: "Item not found with id " + req.params.id
        });            
    }
      res.json(item)}
    )
    .catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).json({
              message: "Item not found with id " + req.params.id
          });                
      }
      return res.status(500).json({
          message: "Error retrieving item with id " + req.params.id
      });
  });
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    kodi: req.body.kodi,
    cmimBlerje: req.body.cmimBlerje,
    shitesi: req.body.shitesi,
    prodhuesi: req.body.prodhuesi,
    category: req.body.category
  });

  newItem.save().then(item => res.json(item)).catch(err => {
    return res.status(500).json({
      message: "Error saving item"
    });
  });
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   EDIT api/items/:id
// @desc    EDIT An Item
// @access  Private
router.put("/:id", auth,(req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      kodi: req.body.kodi,
      cmimBlerje: req.body.cmimBlerje,
      shitesi: req.body.shitesi,
      prodhuesi: req.body.prodhuesi,
      category: req.body.category
    },
    { new: true }
  )
    .then(item => {
      if (!item) {
        return res
          .status(404)
          .json({ msg: "Item not found with id " + req.params.id });
      }
      res.json(item);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Item not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating item with id " + req.params.id });
    });
});

//Export router
module.exports = router;
