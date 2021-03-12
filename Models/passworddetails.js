const mongoose = require("mongoose");

const PasswordDetailsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
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
