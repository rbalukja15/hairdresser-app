const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Employee Model
const Employee = require("../../models/Employee");

// @route   GET api/employees
// @desc    Get All Employees
// @access  Public
router.get("/", auth, (req, res) => {
  Employee.find(req.params.id).then(employees => {
    res.json(employees);
  });
});

// @route   GET api/employees/:id
// @desc    Get One Employees
// @access  Public
router.get("/:id",  (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found with id " + req.params.id
        });
      }
      res.json(employee);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Employee not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Error retrieving Employee with id " + req.params.id
      });
    });
});

// @route   POST api/employees
// @desc    Create An Employee
// @access  Private
router.post("/", auth, (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    surname: req.body.surname,
    numerSigurime: req.body.numerSigurime,
    status: req.body.status,
    gjendjaCivile: req.body.gjendjaCivile,
    ditelindja: req.body.ditelindja,
    dataFillim: req.body.dataFillim,
    dataMbarim: req.body.dataMbarim,
    pozicioni: req.body.pozicioni,
    arsimimi: req.body.arsimimi,
    vendlindja: req.body.vendlindja,
    adresa: req.body.adresa
  });

  //newEmployee.save().then(employee => res.json(employee)).catch(console.log("error"));
  newEmployee.save(function(err, resp) {
    if (err) {
      //console.log(newEmployee);
      res.send({
        message: 'something went wrong'
      });
    } else {
      res.send({
        message: 'the employee has been saved'
      });
    }

  });
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Private
router.delete("/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => employee.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   EDIT api/items/:id
// @desc    EDIT An Item
// @access  Private
router.put("/:id", auth, (req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).json({
  //     message: "Note content can not be empty"
  //   });
  // }

  Employee.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname,
      numerSigurime: req.body.numerSigurime,
      status: req.body.status,
      gjendjaCivile: req.body.gjendjaCivile,
      ditelindja: req.body.ditelindja,
      dataFillim: req.body.dataFillim,
      dataMbarim: req.body.dataMbarim,
      pozicioni: req.body.pozicioni,
      arsimimi: req.body.arsimimi,
      vendlindja: req.body.vendlindja,
      adresa: req.body.adresa
    },
    { new: true }
  )
    .then(employee => {
      if (!employee) {
        return res
          .status(404)
          .json({ msg: "Employee not found with id " + req.params.id });
      }
      res.json({ msg: "success"});
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json({ msg: "Employee not found with id " + req.params.id });
      }

      return res
        .status(500)
        .json({ msg: "Error updating Employee with id " + req.params.id });
    });
});

//Export router
module.exports = router;
