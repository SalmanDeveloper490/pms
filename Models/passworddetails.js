const mongoose = require("mongoose");

const schema = mongoose.Schema;

const PasswordDetailsSchema = new mongoose.Schema(
  {
    password_cat_name: {
      type: String,
      required: true,
    },
    password_details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("password_details", PasswordDetailsSchema);
