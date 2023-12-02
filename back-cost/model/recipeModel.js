const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    require: true,
  },
  recipe: [
    {
      name: {
        type: String,
        require: true,
        trim: true,
      },
      price: {
        type: Number,
        require: true,
      },
      createdTime: Date,
    },
  ],
});

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
