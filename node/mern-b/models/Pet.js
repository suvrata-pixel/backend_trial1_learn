const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image : {
    type : String
  }
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);