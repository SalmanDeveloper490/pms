const express = require("express");
const router = express.Router();
// controllers
const {
  homePage,
  loginForm,
  registerForm,
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
// controllers

// auth middleware
// const { checkAuthenticated } = require("../middlewares/auth");

// Routes
router.get("/", homePage);
router.get("/login", loginForm);
router.post("/login", loginUser);
router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/logout", logout);
// Routes

module.exports = router;
