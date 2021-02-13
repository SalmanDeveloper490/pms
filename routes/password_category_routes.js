const express = require("express");
const router = express.Router();
const {
  passswordCategoryView,
  addPasswordCategory,
  viewPasswordCategory,
  editPasswordCategory,
  postEditPasswordCategory,
  deletePasswordCategory,
  passwordCategoryPagination,
} = require("../controllers/PasswordCategoryController");

// auth middleware
const { checkAuthenticated } = require("../middlewares/auth");

// Routes
router.get("/add_password_category", checkAuthenticated, passswordCategoryView);
router.post("/add_password_category", addPasswordCategory);
router.get(
  "/view_password_categories",
  checkAuthenticated,
  viewPasswordCategory
);
router.get(
  "/view_password_categories/:page",
  checkAuthenticated,
  passwordCategoryPagination
);
router.get(
  "/view_password_categories/edit/:id",
  checkAuthenticated,
  editPasswordCategory
);
router.post("/view_password_categories/edit/", postEditPasswordCategory);
router.get(
  "/view_password_categories/delete/:id",
  checkAuthenticated,
  deletePasswordCategory
);
// Routes

module.exports = router;
