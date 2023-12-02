const mongoose = require("mongoose");

const tenGramSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
  },
  gram: {
    type: Number,
    require: false,
  },
  createdTime: Date,
});

const TenGram = mongoose.model("tenGram", tenGramSchema);
module.exports = TenGram;
