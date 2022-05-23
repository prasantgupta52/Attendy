const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
    // default: "Sample Todo"
  },
  LastName: {
    type: String,
    required: true
  },
  Class: {
    type: String,
    required: true
    // default: "This is a simple sample Todo"
  },
  Section: {
    type: String,
    required: true
  },
  Roll: {
    type: Number,
    required: true
    // default: -1
  },
  ModifiedOnDate: {
    type: Date,
    default: Date.now
  }
});
//  mongoose.model(userid, usertodo);

module.exports = function (userid) {
  const collectionName = `${userid}`;
  const model = mongoose.model(collectionName, Student);
  return model;
}