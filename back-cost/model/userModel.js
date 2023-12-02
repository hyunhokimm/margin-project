const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  nickname: {
    type: String,
    require: true,
  },

  createdTime: Date,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
