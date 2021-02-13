const mongoose = require("mongoose");

const schema = mongoose.Schema;

const PasswordCatSchema = new mongoose.Schema(
  {
    pass_cat_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("password_categories", PasswordCatSchema);
