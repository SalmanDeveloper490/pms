const express = require("express");
const router = express.Router();

// password detail controller
const {
  addPasswordDetails,
  postPasswordDetails,
  passwordDetails,
  editPassword,
  postEditPassword,
  deletePassword,
} = require("../controllers/PasswordDetailController");

// auth middleware
const { checkAuthenticated } = require("../middlewares/auth");

// Routes
router.get("/add_password_details", checkAuthenticated, addPasswordDetails);
router.post("/add_password_details", postPasswordDetails);
router.get(
  "/view_password_details/:page?",
  checkAuthenticated,
  passwordDetails
);
router.get("/view_password_details/edit/:id", checkAuthenticated, editPassword);
router.post("/view_password_details/edit/", postEditPassword);
router.get(
  "/view_password_details/delete/:id",
  checkAuthenticated,
  deletePassword
);
// Routes

module.exports = router;
