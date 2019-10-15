const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Category = require('../../models/Category');

// @route   GET api/category
// @desc    Get All Categories
// @access  Public
router.get('/', (req, res) => {
  Category.find()
    .sort({ date: -1 })
    .then(categories => res.json(categories));
});

// @route   GET api/category/:id
// @desc    Get One Category
// @access  Private
router.get("/:id", auth,(req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      if(!category) {
        return res.status(404).json({
            message: "Category not found with id " + req.params.id
        });            
    }
      res.json(category)}
    )
    .catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).json({
              message: "Category not found with id " + req.params.id
          });                
      }
      return res.status(500).json({
          message: "Error retrieving category with id " + req.params.id
      });
  });
});

// @route   POST api/category
// @desc    Create A Category
// @access  Public
router.post('/', auth,(req, res) => {
  const newCategory = new Category({
    name: req.body.name
  });

  newCategory.save()
              .then(category => res.json(category))
              .catch( err => console.log(err) )
            });

//   newCategory.save(function(err, resp) {
//     if (err) {
//       //console.log(newEmployee);
//       res.send(res.json(category),{
//         message: 'something went wrong',
//       });
//     } else {
//       res.send({
//         message: 'the category has been saved'
//       });
//     }

//   });
// });

// @route   DELETE api/category/:id
// @desc    Delete A Category
// @access  Public
router.delete('/:id', auth,(req, res) => {
  Category.findById(req.params.id)
    .then(category => category.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


// @route   EDIT api/category/:id
// @desc    EDIT A Category
// @access  Private
router.put("/:id", auth, (req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  )
    .then(category => {
      if (!category) {
        return res
          .status(404)
          .json({ msg: "Category not found with iiiiiiid " + req.params.id });
      }
      res.json(category);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Category not found with iiiiiiid " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating Category with id " + req.params.id });
    });
});


//Export router
module.exports = router;