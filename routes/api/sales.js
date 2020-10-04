const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Shitje Model
const Sale = require("../../models/Sale");

// @route   GET api/sales
// @desc    Get All Sales
// @access  Public
router.get("/", (req, res) => {
  Sale.find()
    .sort({ date: -1 })
    .then(sales => res.json(sales));
});

// @route   GET api/sales/:id
// @desc    Get One Sale
// @access  Private
router.get("/:id", auth,(req, res) => {
  Sale.findById(req.params.id)
    .then(sale => {
      if(!sale) {
        return res.status(404).json({
            message: "Sale not found with id " + req.params.id
        });            
    }
      res.json(sale)}
    )
    .catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).json({
              message: "Sale not found with id " + req.params.id
          });                
      }
      return res.status(500).json({
          message: "Error retrieving sale with id " + req.params.id
      });
  });
});

// @route   POST api/sales
// @desc    Create A Sale
// @access  Public
router.post("/", auth,(req, res) => {
  const newSale = new Sale({
    clientName: req.body.clientName,
    invoiceType: req.body.invoiceType,
    invoiceData: req.body.rows,
    total: req.body.total,
  });

  newSale.save()
          .then(sale => res.json(sale))
          .catch(err => {
                    return res.status(500).json({
                      message: "Error saving buying"
                    });
                  });
});

// @route   DELETE api/sales/:id
// @desc    Delete A Sale
// @access  Public
router.delete("/:id", auth,(req, res) => {
  Sale.findById(req.params.id)
    .then(sale => sale.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   EDIT api/sales/:id
// @desc    EDIT A Sale
// @access  Private
router.put("/:id", auth, (req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Sale.findByIdAndUpdate(
    req.params.id,
    {
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      productName: req.body.productName,
      sasia: req.body.sasia,
      cmimi: req.body.cmimi,
      kodi: req.body.kodi
    },
    { new: true }
  )
    .then(sale => {
      if (!sale) {
        return res
          .status(404)
          .json({ msg: "Sale not found with id " + req.params.id });
      }
      res.json(sale);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Sale not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating sale with id " + req.params.id });
    });
});

//Export router
module.exports = router;
