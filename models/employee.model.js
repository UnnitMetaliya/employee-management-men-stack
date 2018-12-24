const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: "Your full name would be appreciated!" },
  email: { type: String },
  mobile: { type: String },
  city: { type: String }
});

// Custom validation for email
employeeSchema.path("email").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Mind taking a look at email again?");

mongoose.model("Employee", employeeSchema);
