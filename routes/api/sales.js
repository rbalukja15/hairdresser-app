const express = require('express');
const router = express.Router();

//Shitje Model
const Sale = require('../../models/Sale');

// @route   GET api/sales
// @desc    Get All Sales
// @access  Public
router.get('/', (req, res) => {
  Sale.find()
    .sort({ date: -1 })
    .then(sales => res.json(sales));
});

// @route   POST api/sales
// @desc    Create A Sale
// @access  Public
router.post('/', (req, res) => {
  const newSale = new Sale({
    clientName: req.body.clientName,
    clientSurname: req.body.clientSurname,
    productName: req.body.productName,
    sasia: req.body.sasia,
    cmimi: req.body.cmimi,
    kodi: req.body.kodi
  });

  newSale.save().then(sale => res.json(sale));
});

// @route   DELETE api/sales/:id
// @desc    Delete A Sale
// @access  Public
router.delete('/:id', (req, res) => {
  Sale.findById(req.params.id)
    .then(sale => sale.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});



//Export router
module.exports = router;