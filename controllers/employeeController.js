const express = require("express");
var router = express.Router();

//to order a new record, you will have to create object of employee schema into this controller

//first request statement for mongoose then variable Employee to store Employee schema from mongoose
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

//update record function
function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if ((err.name = "ValidationError")) {
          handleValidationError(err, req.body);
          res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: req.body
          });
        } else console.log("Error updating the database: " + err);
      }
    }
  );
}

//to insert the data into database we will have to create a function
function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

//route for employee/list uri
router.get("/list", (req, res) => {
  //retrive records from MongoDB
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
      });
    } else {
      console.log("Error retriving employee list: " + err);
    }
  });
});

// Swtich case use for what caused error
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

//update route.
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc
      });
    }
  });
});

//delete route
router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error while deleting employee: " + err);
    }
  });
});

module.exports = router;
