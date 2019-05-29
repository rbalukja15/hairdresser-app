const express = require('express');
const router = express.Router();

//Product Model
const Product = require('../../models/Inventory');

// @route   GET api/products
// @desc    Get All Products
// @access  Public
router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products));
});

// @route   POST api/products
// @desc    Create A Product
// @access  Public
router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    pershkrimi: req.body.pershkrimi,
    sasia: req.body.sasia,
    cmimBlerje: req.body.cmimBlerje,
    cmimShitje: req.body.cmimShitje
  });

  newProduct.save().then(product => res.json(product));
});

// @route   DELETE api/products/:id
// @desc    Delete A Category
// @access  Public
router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});



//Export router
module.exports = router;